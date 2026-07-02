'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PHONE_RULES: Record<string, { dialCode: string; digits: number; starts: string[] }> = {
  SA: { dialCode: '+966', digits: 9, starts: ['5'] },
  KW: { dialCode: '+965', digits: 8, starts: ['5', '6'] },
  AE: { dialCode: '+971', digits: 9, starts: ['5'] },
  BH: { dialCode: '+973', digits: 8, starts: ['3', '6'] },
  OM: { dialCode: '+968', digits: 8, starts: ['9', '7'] },
  QA: { dialCode: '+974', digits: 8, starts: ['3', '5', '6', '7'] },
};

const COUNTRIES = [
  { code: 'SA', name: 'المملكة العربية السعودية', flag: '🇸🇦' },
  { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'BH', name: 'البحرين', flag: '🇧🇭' },
  { code: 'OM', name: 'عُمان', flag: '🇴🇲' },
  { code: 'QA', name: 'قطر', flag: '🇶🇦' },
];

const OFFERS = [
  { qty: 1, label: 'جهاز RF + كريم الشد', price: 299, badge: '' },
  { qty: 2, label: 'جهازَين RF + ٢ كريم', price: 499, badge: 'وفري ٩٩ ريال', original: 598 },
];

const GEL_PRICE = 39;

function validatePhone(phone: string, country: string): boolean {
  const rule = PHONE_RULES[country];
  if (!rule) return phone.replace(/\D/g, '').length >= 8;
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== rule.digits) return false;
  return rule.starts.some((s) => digits.startsWith(s));
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function LPOrderForm() {
  const router = useRouter();
  const [offer, setOffer] = useState(0);
  const [withGel, setWithGel] = useState(false);
  const [country, setCountry] = useState('SA');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedOffer = OFFERS[offer];
  const totalPrice = selectedOffer.price + (withGel ? GEL_PRICE : 0);
  const phoneValid = phone.length > 0 && validatePhone(phone, country);
  const canSubmit =
    name.trim().length >= 2 && phoneValid && city.trim().length >= 2 && status !== 'loading';
  const rule = PHONE_RULES[country];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('loading');
    setErrorMsg('');

    const fullPhone = `${rule?.dialCode ?? ''}${phone.replace(/\D/g, '')}`;
    const productLabel = `${selectedOffer.label}${withGel ? ' + جل التوصيل' : ''}`;

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: fullPhone,
          city: city.trim(),
          country,
          sku: 'NV-RF-005',
          product: productLabel,
          price: totalPrice,
          currency: 'SAR',
          quantity: selectedOffer.qty,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'حدث خطأ، يرجى المحاولة مرة أخرى');
        setStatus('error');
        return;
      }

      const ref = `NV-${Date.now().toString(36).toUpperCase()}`;
      localStorage.setItem(
        'nuvia_order',
        JSON.stringify({ productName: productLabel, price: totalPrice, currency: 'SAR', ref })
      );
      router.push('/thankyou');
    } catch {
      setErrorMsg('حدث خطأ في الاتصال. تأكدي من اتصالكِ بالإنترنت وحاولي مرة أخرى.');
      setStatus('error');
    }
  }

  return (
    <section id="order" className="py-14 bg-gradient-to-b from-bg-alt to-bg font-tajawal">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-accent text-primary-dark text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            اطلبي الآن — الدفع عند الاستلام 💵
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary">
            احجزي باقة RF الخاصة بكِ
          </h2>
          <p className="text-nuvia-light text-sm mt-2">
            شحن مجاني · دفع عند الاستلام · ضمان 30 يوم
          </p>
        </div>

        {/* Offer Selector */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {OFFERS.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOffer(i)}
              className={`relative rounded-2xl border-2 p-4 text-right transition-all ${
                offer === i
                  ? 'border-primary bg-accent/50 shadow-gold'
                  : 'border-accent bg-white hover:border-primary/40'
              }`}
            >
              {o.badge && (
                <span className="absolute -top-2.5 right-3 bg-nuvia-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {o.badge}
                </span>
              )}
              <p className="text-xs text-nuvia-light mb-1 leading-tight">{o.label}</p>
              <p className="text-xl font-bold text-secondary">
                {o.price} <span className="text-sm font-normal">ر.س</span>
              </p>
              {o.original && (
                <p className="text-xs text-nuvia-light line-through">{o.original} ر.س</p>
              )}
              {offer === i && (
                <span className="absolute top-2 left-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <CheckIcon />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Order Bump */}
        <div
          onClick={() => setWithGel(!withGel)}
          className={`cursor-pointer rounded-2xl border-2 p-4 mb-6 flex items-center gap-4 transition-all ${
            withGel ? 'border-primary bg-accent/50' : 'border-accent bg-white hover:border-primary/30'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              withGel ? 'border-primary bg-primary' : 'border-accent'
            }`}
          >
            {withGel && <CheckIcon />}
          </div>
          <div className="flex-1 text-right">
            <p className="font-semibold text-secondary text-sm">أضيفي جل التوصيل الاحترافي</p>
            <p className="text-xs text-nuvia-light mt-0.5">يضاعف فاعلية الجهاز ويحمي البشرة أثناء الجلسة</p>
          </div>
          <p className="font-bold text-primary text-sm flex-shrink-0">+{GEL_PRICE} ر.س</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white rounded-3xl p-6 shadow-md border border-accent/60"
          dir="rtl"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: سارة العتيبي"
              className="w-full px-4 py-3 rounded-xl border border-accent focus:border-primary focus:outline-none text-secondary text-sm transition-colors"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">الدولة</label>
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setPhone(''); }}
              className="w-full px-4 py-3 rounded-xl border border-accent focus:border-primary focus:outline-none text-secondary text-sm bg-white transition-colors"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">رقم الهاتف</label>
            <div
              className="flex items-center border border-accent rounded-xl overflow-hidden focus-within:border-primary transition-colors"
              dir="ltr"
            >
              <span className="px-3 py-3 bg-bg-alt text-secondary font-mono text-sm border-r border-accent flex-shrink-0 select-none">
                {rule?.dialCode ?? '+966'}
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder={rule ? `${rule.starts[0]}${'X'.repeat(rule.digits - 1)}` : '5XXXXXXXX'}
                maxLength={rule?.digits ?? 10}
                className="flex-1 px-4 py-3 focus:outline-none text-secondary font-mono text-sm bg-white"
                required
              />
            </div>
            {phone.length > 0 && !phoneValid && (
              <p className="text-nuvia-error text-xs mt-1 font-tajawal">
                رقم غير صحيح — يجب أن يبدأ بـ {rule?.starts.join(' أو ')} ويتكون من {rule?.digits} أرقام
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">المدينة</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="مثال: الرياض"
              className="w-full px-4 py-3 rounded-xl border border-accent focus:border-primary focus:outline-none text-secondary text-sm transition-colors"
              required
            />
          </div>

          {/* Order Total */}
          <div className="bg-bg-alt rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs text-nuvia-light">المجموع الكلي</p>
              <p className="font-bold text-secondary text-xl">{totalPrice} <span className="text-sm font-normal">ريال</span></p>
            </div>
            <div className="text-right text-xs text-nuvia-light space-y-0.5">
              <p>🚚 شحن مجاني</p>
              <p>💵 دفع عند الاستلام</p>
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-200 ${
              canSubmit
                ? 'bg-gradient-to-r from-primary to-primary-dark shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 order-btn-pulse'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                جاري إرسال الطلب...
              </span>
            ) : (
              `اطلبي الآن — ${totalPrice} ريال 🛒`
            )}
          </button>

          <p className="text-center text-nuvia-light text-xs">
            💵 الدفع عند الاستلام · 🚚 شحن مجاني · 🔒 بياناتكِ آمنة
          </p>
        </form>
      </div>
    </section>
  );
}
