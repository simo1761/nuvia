'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/data/products';
import ProductImage from '@/components/shared/ProductImage';
import { formatPrice } from '@/lib/utils';

interface CheckoutFormProps {
  product: Product;
}

type Status  = 'idle' | 'loading' | 'success' | 'error';
type OtpStep = 'hidden' | 'prompt' | 'counting' | 'skip';

const COUNTDOWN_SEC = 15;

const countries = [
  { code: 'SA', name: 'المملكة العربية السعودية', flag: '🇸🇦' },
  { code: 'KW', name: 'الكويت',                   flag: '🇰🇼' },
  { code: 'AE', name: 'الإمارات',                 flag: '🇦🇪' },
  { code: 'BH', name: 'البحرين',                  flag: '🇧🇭' },
  { code: 'OM', name: 'عُمان',                    flag: '🇴🇲' },
  { code: 'QA', name: 'قطر',                      flag: '🇶🇦' },
];

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 5) return phone;
  return digits.slice(0, 4) + '•'.repeat(digits.length - 4);
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', country: 'SA' });
  const [status,  setStatus]  = useState<Status>('idle');
  const [error,   setError]   = useState('');
  const [otpStep, setOtpStep] = useState<OtpStep>('hidden');
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  useEffect(() => () => clearTimer(), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Step 1 — form submit: validate then open OTP modal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOtpStep('prompt');
  };

  // Step 2 — customer clicks "أرسلي رمز التحقق"
  const handleSendCode = () => {
    setOtpStep('counting');
    setCountdown(COUNTDOWN_SEC);
    clearTimer();
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearTimer();
          setOtpStep('skip');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 3 — customer clicks "تخطي" → actual API call
  const handleConfirm = useCallback(async () => {
    clearTimer();
    setOtpStep('hidden');
    setStatus('loading');
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
      if (typeof window !== 'undefined') {
        // @ts-ignore
        if (window.fbq)    window.fbq('track', 'Purchase', { value: product.price, currency: 'SAR' });
        // @ts-ignore
        if (window.ttq)    window.ttq.track('PlaceAnOrder', { value: product.price, currency: 'SAR' });
        // @ts-ignore
        if (window.snaptr) window.snaptr('track', 'PURCHASE', { price: product.price, currency: 'SAR' });
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
  }, [form, product]);

  // SVG circle progress
  const r = 34;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (countdown / COUNTDOWN_SEC); // full at start → empty at 0

  return (
    <>
      {/* ── OTP Modal ───────────────────────────────────────── */}
      {otpStep !== 'hidden' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeSlideUp_0.3s_ease-out]"
            dir="rtl"
          >
            {/* Modal header */}
            <div className="bg-gradient-to-r from-secondary to-[#2a1a3e] px-6 pt-7 pb-5 text-center">
              {/* Phone icon with gold ring */}
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg,#C9A96E,#B08D4F)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg leading-snug">
                التحقق من رقم الجوال
              </h3>
              <p className="text-white/65 text-sm mt-1">
                {maskPhone(form.phone)}
              </p>
            </div>

            {/* Modal body */}
            <div className="px-6 py-6 text-center">

              {/* STEP: prompt */}
              {otpStep === 'prompt' && (
                <>
                  <p className="text-nuvia-text text-sm leading-relaxed mb-6">
                    لضمان شحن طلبك بسرعة، يرجى التحقق من رقم هاتفك
                  </p>
                  <button
                    onClick={handleSendCode}
                    className="w-full py-3.5 rounded-2xl font-bold text-white text-base shadow-gold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#C9A96E,#B08D4F)' }}
                  >
                    أرسلي رمز التحقق
                  </button>
                </>
              )}

              {/* STEP: counting */}
              {otpStep === 'counting' && (
                <>
                  <p className="text-nuvia-light text-sm mb-5">
                    جاري إرسال رمز التحقق...
                  </p>
                  {/* Circular countdown */}
                  <div className="relative mx-auto w-24 h-24 mb-5">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      {/* track */}
                      <circle cx="40" cy="40" r={r} fill="none" stroke="#F7F3ED" strokeWidth="6"/>
                      {/* progress */}
                      <circle
                        cx="40" cy="40" r={r}
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={dashOffset}
                        style={{ transition: 'stroke-dashoffset 0.9s linear' }}
                      />
                      <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%"   stopColor="#C9A96E"/>
                          <stop offset="100%" stopColor="#B08D4F"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-secondary">
                      {countdown}
                    </span>
                  </div>
                  <p className="text-nuvia-light text-xs">
                    يرجى الانتظار {countdown} ثانية
                  </p>
                  {/* Skip button hidden during countdown */}
                </>
              )}

              {/* STEP: skip (countdown finished) */}
              {otpStep === 'skip' && (
                <>
                  <p className="text-nuvia-light text-sm mb-6">
                    لم يصل رمز التحقق إلى رقمك؟
                  </p>
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3.5 rounded-2xl font-bold text-secondary text-sm border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all duration-200"
                  >
                    لم يصلني الرمز — تخطي هذه الخطوة
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Checkout section ───────────────────────────────── */}
      <section id="checkout" className="py-16 bg-bg scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
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
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
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
                    id="phone" name="phone" type="tel" required
                    value={form.phone} onChange={handleChange}
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
                    id="city" name="city" type="text" required
                    value={form.city} onChange={handleChange}
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
                    id="country" name="country" required
                    value={form.country} onChange={handleChange}
                    className="w-full border border-accent rounded-xl px-4 py-3 text-nuvia-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm bg-bg appearance-none"
                  >
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
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
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      جاري إرسال الطلب...
                    </span>
                  ) : 'تأكيد الطلب 📦'}
                </button>
              </form>
            )}

            {/* Trust badges */}
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
    </>
  );
}
