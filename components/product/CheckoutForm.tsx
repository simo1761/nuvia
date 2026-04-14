'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductImage from '@/components/shared/ProductImage';
import { formatPrice } from '@/lib/utils';

interface CheckoutFormProps {
  product: Product;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const countries = [
  { code: 'SA', name: 'المملكة العربية السعودية', flag: '🇸🇦' },
  { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'BH', name: 'البحرين', flag: '🇧🇭' },
  { code: 'OM', name: 'عُمان', flag: '🇴🇲' },
  { code: 'QA', name: 'قطر', flag: '🇶🇦' },
];

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    country: 'SA',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sku: product.sku,
          product: product.nameEn,
          price: product.price,
          currency: product.currency,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'حدث خطأ غير متوقع');
      }

      setStatus('success');

      // Fire conversion events
      if (typeof window !== 'undefined') {
        // @ts-ignore
        if (window.fbq) window.fbq('track', 'Purchase', { value: product.price, currency: 'SAR' });
        // @ts-ignore
        if (window.ttq) window.ttq.track('PlaceAnOrder', { value: product.price, currency: 'SAR' });
        // @ts-ignore
        if (window.snaptr) window.snaptr('track', 'PURCHASE', { price: product.price, currency: 'SAR' });
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section id="checkout" className="py-16 bg-bg scroll-mt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Container */}
        <div className="bg-white rounded-2xl shadow-gold-lg border border-primary/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white px-6 py-5">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              اطلبي الآن — الدفع عند الاستلام 💵
            </h2>
            <p className="text-white/70 text-sm text-center mt-1">
              أدخلي بياناتك وسنتواصل معك لتأكيد الطلب
            </p>
          </div>

          {/* Product summary */}
          <div className="flex items-center gap-4 px-6 py-4 bg-bg-alt border-b border-accent/40">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-bg border border-accent/40 flex-shrink-0">
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                productName={product.name}
                fill
                className="object-cover"
                sizes="64px"
                wrapperClassName="absolute inset-0"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-secondary text-sm">{product.name}</p>
              <p className="text-nuvia-light text-xs mt-0.5">{product.tagline}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-primary text-lg">
                {formatPrice(product.price, product.currency)}
              </p>
              <p className="text-xs text-nuvia-success">✅ متوفر</p>
            </div>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-nuvia-success mb-2">
                تم استلام طلبك بنجاح!
              </h3>
              <p className="text-nuvia-text text-base mb-2">
                سنتواصل معك قريباً لتأكيد الطلب والشحن
              </p>
              <p className="text-nuvia-light text-sm">
                رقم الهاتف: <span className="font-semibold">{form.phone}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5" htmlFor="name">
                  الاسم الكامل <span className="text-nuvia-error">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="أدخلي اسمك الكامل"
                  className="w-full border border-accent rounded-xl px-4 py-3 text-nuvia-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-bg"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5" htmlFor="phone">
                  رقم الجوال <span className="text-nuvia-error">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  className="w-full border border-accent rounded-xl px-4 py-3 text-nuvia-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-bg text-right"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5" htmlFor="city">
                  المدينة <span className="text-nuvia-error">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="أدخلي اسم مدينتك"
                  className="w-full border border-accent rounded-xl px-4 py-3 text-nuvia-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-bg"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1.5" htmlFor="country">
                  الدولة <span className="text-nuvia-error">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-accent rounded-xl px-4 py-3 text-nuvia-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-bg appearance-none"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-nuvia-error text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-gold hover:shadow-gold-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 order-btn-pulse"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري إرسال الطلب...
                  </span>
                ) : (
                  'تأكيد الطلب 📦'
                )}
              </button>
            </form>
          )}

          {/* Trust badges footer */}
          <div className="border-t border-accent/40 px-6 py-4 bg-bg-alt">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-nuvia-light">
              <span className="flex items-center gap-1">🔒 معلوماتك آمنة 100%</span>
              <span className="flex items-center gap-1">🚚 شحن سريع خلال 2-5 أيام</span>
              <span className="flex items-center gap-1">💰 الدفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
