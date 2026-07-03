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

        {/* ── Contact via email ── */}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-secondary text-sm mb-3 transition-all hover:-translate-y-0.5 border-2 border-accent/60 bg-white shadow-sm"
        >
          <span className="text-lg">📧</span>
          تواصلي معنا عبر البريد الإلكتروني
        </a>

        <p className="text-center text-nuvia-light text-xs">
          نوفيا كلينيك — شحن مجاني · دفع عند الاستلام · ضمان 30 يوم
        </p>
      </div>
    </main>
  );
}
