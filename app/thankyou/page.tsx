'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/data/site-config';

interface OrderSummary {
  productName: string;
  price: number;
  currency: string;
  ref: string;
}

export default function ThankYouPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('nuvia_order');
    if (!raw) {
      router.replace('/');
      return;
    }
    try {
      const data: OrderSummary = JSON.parse(raw);
      setOrder(data);
      localStorage.removeItem('nuvia_order');
      requestAnimationFrame(() => setAnimating(true));
      if (typeof window !== 'undefined') {
        // @ts-ignore
        if (window.fbq) window.fbq('track', 'Purchase', { value: data.price, currency: data.currency });
      }
    } catch {
      router.replace('/');
    }
  }, [router]);

  if (!order) return null;

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md font-tajawal">

        {/* ── CALL CONFIRMATION — most critical conversion step ── */}
        <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-3xl p-7 mb-4 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-primary/25 border-4 border-primary/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📞</span>
          </div>
          <h1 className="text-xl font-bold mb-2">سيتصل بكِ فريقنا قريباً!</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-5">
            الرجاء <strong className="text-primary">الرد على المكالمة</strong> لتأكيد طلبكِ وتجهيز الشحنة.
            الرقم سيكون من المنطقة المحلية.
          </p>

          {/* Bouncing dots */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="flex gap-1.5">
              {[0, 150, 300].map((d) => (
                <div
                  key={d}
                  className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
            <span className="text-primary text-sm font-medium">جاري الاتصال بكِ...</span>
            <div className="flex gap-1.5">
              {[0, 150, 300].map((d) => (
                <div
                  key={d}
                  className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl px-4 py-3 text-sm">
            ⚠️ إذا لم تستقبلي المكالمة، قد يتأخر أو يُلغى شحن طلبكِ
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="bg-white rounded-3xl shadow-md border border-accent/60 overflow-hidden mb-4">
          <div className="h-1.5 bg-gradient-to-r from-primary to-primary-dark" />
          <div className="px-6 py-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-nuvia-success/10 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7">
                  <circle
                    cx="50" cy="50" r="46"
                    stroke="#4CAF50" strokeWidth="8" fill="none"
                    strokeDasharray="289"
                    strokeDashoffset={animating ? 0 : 289}
                    style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
                  />
                  <path
                    d="M28 52 L43 67 L72 36"
                    stroke="#4CAF50" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round" fill="none"
                    strokeDasharray="60"
                    strokeDashoffset={animating ? 0 : 60}
                    style={{ transition: 'stroke-dashoffset 0.4s ease-out 0.5s' }}
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-secondary">تم استلام طلبكِ بنجاح ✅</p>
                <p className="text-nuvia-light text-xs mt-0.5" dir="ltr">{order.ref}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <span className="text-nuvia-light flex-shrink-0">المنتج</span>
                <span className="font-semibold text-secondary text-xs text-left leading-snug max-w-[60%]">
                  {order.productName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-nuvia-light">المبلغ المستحق</span>
                <span className="font-bold text-primary">{order.price} {order.currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-nuvia-light">طريقة الدفع</span>
                <span className="font-semibold text-secondary">💵 عند الاستلام</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-nuvia-light">التوصيل</span>
                <span className="font-semibold text-nuvia-success">🚚 مجاني</span>
              </div>
              <div className="flex items-center justify-between border-t border-accent/40 pt-3">
                <span className="text-nuvia-light text-xs">رقم الطلب</span>
                <span className="font-mono font-bold text-secondary text-xs tracking-wide" dir="ltr">
                  {order.ref}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── WhatsApp ── */}
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white text-sm mb-3 transition-all hover:-translate-y-0.5 shadow-md"
          style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          تواصلي معنا عبر الواتساب
        </a>

        <p className="text-center text-nuvia-light text-xs">
          نوفيا كلينيك — شحن مجاني · دفع عند الاستلام · ضمان 30 يوم
        </p>
      </div>
    </main>
  );
}
