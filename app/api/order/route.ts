import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
  console.log('[ORDER] Request received');
  try {
    const body = await req.json();
    console.log('[ORDER] Body:', JSON.stringify(body, null, 2));

    const { name, phone, city, country, sku, price, currency } = body;

    if (!name || !phone || !city || !country || !sku) {
      console.log('[ORDER] Validation failed — missing fields:', { name: !!name, phone: !!phone, city: !!city, country: !!country, sku: !!sku });
      return NextResponse.json(
        { error: 'يرجى ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    if (!/^\+?\d{9,15}$/.test(cleanPhone)) {
      console.log('[ORDER] Phone validation failed:', cleanPhone);
      return NextResponse.json(
        { error: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      );
    }

    // ── 1. Google Sheets (primary, always attempted) ──────────────
    console.log('[ORDER] Calling appendOrderToSheet...');
    await appendOrderToSheet({ name, phone: cleanPhone, city, country, sku, price, currency });
    console.log('[ORDER] Google Sheets — row appended');

    // ── 2. Backend DB + CAPI (optional, fire-and-forget) ─────────
    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      const productName = body.product ?? sku;
      fetch(`${backendUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          phone: cleanPhone,
          city,
          productSlug: sku,
          productName,
          price: price ?? 0,
          fbclid: body.fbclid ?? null,
          fbp: body.fbp ?? null,
          fbc: body.fbc ?? null,
          ipAddress: req.headers.get('x-forwarded-for') ?? req.ip ?? null,
          userAgent: req.headers.get('user-agent') ?? null,
        }),
      })
        .then(r => r.ok
          ? console.log('[ORDER] Backend DB — order saved')
          : r.text().then(t => console.warn('[ORDER] Backend returned', r.status, t))
        )
        .catch(err => console.warn('[ORDER] Backend unreachable:', (err as Error).message));
    }

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
