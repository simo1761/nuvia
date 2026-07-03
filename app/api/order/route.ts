import { NextRequest, NextResponse } from 'next/server';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export const runtime = 'nodejs';

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
const ORDERS_FILE =
  process.env.ORDERS_FILE ??
  (process.platform === 'win32'
    ? join(process.cwd(), 'orders.json')
    : '/tmp/nuvia-orders.json');

// ---------------------------------------------------------------------------
// COD Network — called directly so we can send gel at price 0
// Set these in Easypanel env vars (copy COD_API_KEY from bawadiycoffee):
//   COD_API_KEY=<your key>
//   COD_DEVICE_SKU=RF1NUVMSST   (replace with real SKU when ready)
//   COD_GEL_SKU=ULT250SNDGM     (replace with real SKU when ready)
// ---------------------------------------------------------------------------
const COD_API_URL   = process.env.COD_API_URL   ?? 'https://api.cod.network/v2';
const COD_API_KEY   = process.env.COD_API_KEY   ?? '';
const COD_DEVICE_SKU = process.env.COD_DEVICE_SKU ?? 'RF1NUVMSST';
const COD_GEL_SKU    = process.env.COD_GEL_SKU    ?? 'ULT250SNDGM';
const COD_TEST_MODE  = process.env.COD_TEST_MODE === 'true';

export interface Order {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  country: string;
  sku: string;
  product: string;
  price: number;
  currency: string;
  status: 'new' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  codLeadId?: string;
}

function loadOrders(): Order[] {
  try {
    if (existsSync(ORDERS_FILE)) {
      return JSON.parse(readFileSync(ORDERS_FILE, 'utf8')) as Order[];
    }
  } catch {
    // corrupted file — start fresh
  }
  return [];
}

function saveOrders(orders: Order[]): void {
  const dir = dirname(ORDERS_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// ---------------------------------------------------------------------------
// Forward to COD Network as a lead (fire-and-forget)
// COD Network accepts price: 0 for bundled items (gel = free gift).
// We do NOT go through bawadiycoffee because its Fastify schema enforces
// unitPrice minimum: 1, which would reject the gel at 0 SAR.
// ---------------------------------------------------------------------------
async function sendToCod(order: Order): Promise<string | null> {
  if (!COD_API_KEY) {
    console.warn('[COD] COD_API_KEY not configured — skipping lead.');
    return null;
  }

  // COD expects E.164 without the + prefix: "9665XXXXXXXX"
  const phone = order.phone.replace(/^\+/, '');

  const payload = {
    phone,
    country: order.country,
    name:    order.name,
    items: [
      { sku: COD_DEVICE_SKU, price: order.price, quantity: 1 },
      { sku: COD_GEL_SKU,    price: 0,           quantity: 1 },
    ],
  };

  if (COD_TEST_MODE) {
    console.log('[COD-TEST] Would send to /seller/leads:', JSON.stringify(payload));
    return 'TEST-LEAD';
  }

  const res = await fetch(`${COD_API_URL}/seller/leads`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${COD_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json: Record<string, unknown> = {};
  try { json = JSON.parse(text) as Record<string, unknown>; } catch { /* ignore */ }

  if (res.ok) {
    const data = json.data as Record<string, unknown> | undefined;
    const leadId = data?.id ? String(data.id) : null;
    console.log('[COD] Lead created:', leadId, '— order:', order.id);
    return leadId;
  }

  console.error('[COD] Failed to create lead — status:', res.status, '— body:', text);
  return null;
}

// ---------------------------------------------------------------------------
// POST /api/order
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { name, phone, city, country, sku, product, price, currency } = body as {
      name?: string; phone?: string; city?: string; country?: string;
      sku?: string; product?: string; price?: number; currency?: string;
    };

    if (!name || !phone || !city || !country || !sku) {
      return NextResponse.json({ error: 'يرجى ملء جميع الحقول المطلوبة' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      return NextResponse.json({ error: 'رقم الهاتف غير صحيح' }, { status: 400 });
    }

    const order: Order = {
      id:        `NV-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name,
      phone:    cleanPhone,
      city,
      country,
      sku,
      product:  product ?? sku,
      price:    typeof price === 'number' ? price : 239,
      currency: currency ?? 'SAR',
      status:   'new',
    };

    // Save locally first
    const orders = loadOrders();
    orders.push(order);
    saveOrders(orders);
    console.log('[ORDER] Saved to', ORDERS_FILE, '—', order.id, name, cleanPhone, city);

    // Fire-and-forget to COD Network (never blocks the customer response)
    sendToCod(order)
      .then((leadId) => {
        if (leadId) {
          // Update the stored order with the COD lead ID
          try {
            const all = loadOrders();
            const idx = all.findIndex(o => o.id === order.id);
            if (idx !== -1) { all[idx].codLeadId = leadId; saveOrders(all); }
          } catch { /* non-critical */ }
        }
      })
      .catch(err => console.error('[COD] Unhandled error:', err));

    return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[ORDER] Failed:', msg);
    return NextResponse.json(
      { error: `حدث خطأ في حفظ الطلب: ${msg}` },
      { status: 500 }
    );
  }
}
