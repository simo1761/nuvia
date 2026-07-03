import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configurable via env var — set ORDERS_FILE=/app/data/orders.json in Easypanel
// to point at a persistent mounted volume.
const ORDERS_FILE = process.env.ORDERS_FILE ?? path.join(process.cwd(), 'orders.json');

function loadOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')) as Order[];
    }
  } catch {
    // corrupted file — start fresh
  }
  return [];
}

function saveOrders(orders: Order[]): void {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, city, country, sku, product, price, currency } = body;

    if (!name || !phone || !city || !country || !sku) {
      return NextResponse.json({ error: 'يرجى ملء جميع الحقول المطلوبة' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      return NextResponse.json({ error: 'رقم الهاتف غير صحيح' }, { status: 400 });
    }

    const order: Order = {
      id: `NV-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name,
      phone: cleanPhone,
      city,
      country,
      sku,
      product: product ?? sku,
      price: price ?? 239,
      currency: currency ?? 'SAR',
      status: 'new',
    };

    const orders = loadOrders();
    orders.push(order);
    saveOrders(orders);

    console.log('[ORDER] Saved:', order.id, name, cleanPhone, city);
    return NextResponse.json({ success: true, orderId: order.id }, { status: 200 });
  } catch (err) {
    console.error('[ORDER] Error:', err);
    return NextResponse.json(
      { error: 'حدث خطأ في حفظ الطلب. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}
