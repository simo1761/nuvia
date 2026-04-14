import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, city, country, sku, product, price, currency } = body;

    // Basic validation
    if (!name || !phone || !city || !country || !sku) {
      return NextResponse.json(
        { error: 'يرجى ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Phone validation: must be at least 9 digits
    const cleanPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      );
    }

    await appendOrderToSheet({
      name,
      phone: cleanPhone,
      city,
      country,
      sku,
      product,
      price,
      currency,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('Order API error:', err);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}
