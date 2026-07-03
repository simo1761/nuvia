import { NextRequest, NextResponse } from 'next/server';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export const runtime = 'nodejs';

// In Docker/Easypanel the app dir is read-only, so default to /tmp.
// Set ORDERS_FILE env var in Easypanel to a mounted volume path for persistence:
//   ORDERS_FILE=/data/orders.json  (with /data mounted as a volume)
const ORDERS_FILE =
  process.env.ORDERS_FILE ??
  (process.platform === 'win32'
    ? join(process.cwd(), 'orders.json')      // dev on Windows: project root
    : '/tmp/nuvia-orders.json');               // Docker: always writable

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

    const orders = loadOrders();
    orders.push(order);
    saveOrders(orders);

    console.log('[ORDER] Saved to', ORDERS_FILE, '—', order.id, name, cleanPhone, city);
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
