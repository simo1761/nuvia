import { NextRequest, NextResponse } from 'next/server';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { sendPurchaseCapi } from '@/lib/meta-capi';

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
// COD Network
// ---------------------------------------------------------------------------
const COD_API_URL    = process.env.COD_API_URL    ?? 'https://api.cod.network/v2';
const COD_API_KEY    = process.env.COD_API_KEY    ?? '';
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
  sentToCod: boolean;
  codNote?: string;
  codLeadId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

function loadOrders(): Order[] {
  try {
    if (existsSync(ORDERS_FILE)) {
      return JSON.parse(readFileSync(ORDERS_FILE, 'utf8')) as Order[];
    }
  } catch { /* corrupted file — start fresh */ }
  return [];
}

function saveOrders(orders: Order[]): void {
  const dir = dirname(ORDERS_FILE);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// Returns true if this phone has already been sent to COD Network before
function isReturningCustomer(phone: string, orders: Order[]): boolean {
  return orders.some(o => o.phone === phone && o.sentToCod === true);
}

async function sendToCod(order: Order): Promise<string | null> {
  if (!COD_API_KEY) {
    console.warn('[COD] COD_API_KEY not configured — skipping lead.');
    return null;
  }

  const phone   = order.phone.replace(/^\+/, '');
  const payload: Record<string, unknown> = {
    phone,
    country: order.country,
    name:    order.name,
    items: [
      { sku: COD_DEVICE_SKU, price: order.price, quantity: 1 },
      { sku: COD_GEL_SKU,    price: 0,           quantity: 1 },
    ],
  };

  // Sanitize UTMs before forwarding:
  // - utm_campaign containing "test" → replace with prod campaign name
  // - utm_term → strip the word "test" (e.g. "test4_image" → "4_image")
  const cleanCampaign = order.utmCampaign
    ? (/test/i.test(order.utmCampaign) ? 'NUVIA_RF1NUVMSSG_SCALL_CREA_V1' : order.utmCampaign)
    : undefined;
  const cleanTerm = order.utmTerm
    ? order.utmTerm.replace(/test/gi, '')
    : undefined;

  if (order.utmSource)  payload.utm_source   = order.utmSource;
  if (order.utmMedium)  payload.utm_medium   = order.utmMedium;
  if (cleanCampaign)    payload.utm_campaign = cleanCampaign;
  if (order.utmContent) payload.utm_content  = order.utmContent;
  if (cleanTerm)        payload.utm_term     = cleanTerm;

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
    const data   = json.data as Record<string, unknown> | undefined;
    const leadId = data?.id ? String(data.id) : 'sent';
    console.log('[COD] Lead created:', leadId, '— order:', order.id, order.utmCampaign ? `utm: ${order.utmCampaign}` : '');
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
    const {
      name, phone, city, country, sku, product, price, currency,
      capiEventId, fbp, fbc,
      utmSource, utmMedium, utmCampaign, utmContent, utmTerm,
    } = body as {
      name?: string; phone?: string; city?: string; country?: string;
      sku?: string; product?: string; price?: number; currency?: string;
      capiEventId?: string; fbp?: string; fbc?: string;
      utmSource?: string; utmMedium?: string; utmCampaign?: string;
      utmContent?: string; utmTerm?: string;
    };

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
      ?? req.headers.get('x-real-ip')
      ?? '';
    const clientUa = req.headers.get('user-agent') ?? '';

    if (!name || !phone || !city || !country || !sku) {
      return NextResponse.json({ error: 'يرجى ملء جميع الحقول المطلوبة' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      return NextResponse.json({ error: 'رقم الهاتف غير صحيح' }, { status: 400 });
    }

    // Check for returning customer BEFORE saving
    const existingOrders  = loadOrders();
    const returning       = isReturningCustomer(cleanPhone, existingOrders);

    const order: Order = {
      id:        `NV-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name,
      phone:    cleanPhone,
      city,
      country,
      sku,
      product:  product ?? sku,
      price:    typeof price === 'number' ? price : 399,
      currency: currency ?? 'SAR',
      status:   'new',
      sentToCod: false,
      codNote:   returning ? 'returning_customer' : 'pending',
      utmSource:   utmSource   || undefined,
      utmMedium:   utmMedium   || undefined,
      utmCampaign: utmCampaign || undefined,
      utmContent:  utmContent  || undefined,
      utmTerm:     utmTerm     || undefined,
    };

    existingOrders.push(order);
    saveOrders(existingOrders);
    console.log('[ORDER] Saved —', order.id, name, cleanPhone, city,
      returning ? '(returning)' : '(new)',
      order.utmCampaign ? `[campaign: ${order.utmCampaign}]` : '[no utm]');

    // CAPI — always fired regardless of returning status
    if (capiEventId) {
      const firstName = name.split(/\s+/)[0] ?? name;
      sendPurchaseCapi({
        eventId: capiEventId,
        user: { phone: cleanPhone, firstName, city, countryCode: country, clientIp, clientUa, fbp: fbp ?? '', fbc: fbc ?? '' },
        custom: { value: order.price, currency: order.currency, contentIds: [order.sku], orderId: order.id },
      }).catch(err => console.error('[CAPI] Purchase error:', err));
    }

    // COD Network — only for first-time customers
    if (returning) {
      console.log('[COD] Skipping — returning customer:', cleanPhone);
    } else {
      sendToCod(order)
        .then((leadId) => {
          try {
            const all = loadOrders();
            const idx = all.findIndex(o => o.id === order.id);
            if (idx !== -1) {
              all[idx].sentToCod = leadId !== null;
              all[idx].codLeadId = leadId ?? undefined;
              all[idx].codNote   = leadId ? `lead:${leadId}` : 'cod_error';
              saveOrders(all);
            }
          } catch { /* non-critical */ }
        })
        .catch(err => console.error('[COD] Unhandled error:', err));
    }

    return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[ORDER] Failed:', msg);
    return NextResponse.json({ error: `حدث خطأ في حفظ الطلب: ${msg}` }, { status: 500 });
  }
}
