import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
  console.log('[ORDER] Request received');
  try {
    const body = await req.json();
    console.log('[ORDER] Body:', JSON.stringify(body, null, 2));

    const { name, phone, city, country, sku, price, currency } = body;

    // Basic validation
    if (!name || !phone || !city || !country || !sku) {
      console.log('[ORDER] Validation failed — missing fields:', { name: !!name, phone: !!phone, city: !!city, country: !!country, sku: !!sku });
      return NextResponse.json(
        { error: 'يرجى ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Phone: strip spaces and dashes, must be 9–15 digits
    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      console.log('[ORDER] Phone validation failed:', cleanPhone);
      return NextResponse.json(
        { error: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      );
    }

    console.log('[ORDER] Calling appendOrderToSheet...');
    await appendOrderToSheet({
      name,
      phone: cleanPhone,
      city,
      country,
      sku,
      price,
      currency,
    });

    console.log('[ORDER] Success — row appended to sheet');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stack   = err instanceof Error ? err.stack   : undefined;
    console.error('[ORDER] Error:', message);
    if (stack) console.error('[ORDER] Stack:', stack);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}
