'use client';

import { useEffect, useState } from 'react';

export default function LPStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
      const orderEl = document.getElementById('order');
      if (orderEl) {
        const rect = orderEl.getBoundingClientRect();
        setNearForm(rect.top < window.innerHeight + 100 && rect.bottom > -100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || nearForm) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden font-tajawal animate-fade-in">
      <div className="bg-white border-t-2 border-primary/30 shadow-gold-lg px-4 py-3 flex items-center gap-3">
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-nuvia-light">باقة RF الاحترافية</p>
          <p className="font-bold text-secondary text-lg leading-tight">399 ريال</p>
        </div>
        <a
          href="#order"
          className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-full font-bold text-center text-sm shadow-gold order-btn-pulse"
        >
          اطلبي الآن 🛒
        </a>
      </div>
    </div>
  );
}
