import type { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const LPStoryStrip      = dynamic(() => import('@/components/landing/LPStoryStrip'), { ssr: false });
const LPReviewsCarousel = dynamic(() => import('@/components/landing/LPReviewsCarousel'));
const LPOrderForm       = dynamic(() => import('@/components/landing/LPOrderForm'));
const LPFAQAccordion    = dynamic(() => import('@/components/landing/LPFAQAccordion'));
const LPStickyCTA       = dynamic(() => import('@/components/landing/LPStickyCTA'), { ssr: false });

export const metadata: Metadata = {
  title: 'باقة RF لشد الجلد وعلاج السيلوليت — نوفيا كلينيك',
  description:
    'جهاز الترددات الراديوية RF + الموجات الصوتية + EMS الاحترافي. تقنية طبية لبشرة أكثر شداً ونضارة. شحن مجاني لدول الخليج · دفع عند الاستلام · ضمان 30 يوم.',
};

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? 'text-primary' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="font-tajawal" dir="rtl">

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO                                                    */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-secondary overflow-hidden">

        {/* ── MOBILE: full-width image + compact overlay — pack + CTA visible in one screen ── */}
        <div className="relative lg:hidden w-full aspect-[4/5] sm:aspect-[2/3]">
          <Image
            src="/images/lp/hero-pack.webp"
            alt="باقة RF لشد الجلد ومحاربة السيلوليت — نوفيا"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 65%' }}
            priority
            sizes="100vw"
          />
          {/* Gradient: transparent top (pack visible) → dark only at bottom 40% (text readable) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.08) 60%, transparent 78%)' }}
          />

          {/* Compact text — everything visible without scrolling */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-4 pb-4">
            <h1 className="text-2xl font-bold text-white leading-snug mb-2">
              باقة RF لشد الجلد<br />
              <span className="text-primary">ومحاربة السيلوليت</span>
            </h1>
            {/* Price + stars on one line — saves vertical space */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-white/40 text-xs line-through">٤٩٩</span>
                <span className="text-primary font-bold text-[28px] leading-none">٢٣٩</span>
                <span className="text-white/65 text-sm">ريال</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Stars />
                <span className="text-white/60 text-xs">٤.٨ (+١٢٤)</span>
              </div>
            </div>
            <a
              href="#order"
              className="flex items-center justify-center w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-full font-bold text-base shadow-gold hover:-translate-y-0.5 transition-all order-btn-pulse"
            >
              اطلبي الآن — الدفع عند الاستلام
            </a>
            <p className="text-white/25 text-[10px] mt-1.5 text-center">
              💵 دفع عند الاستلام · 🚚 شحن مجاني · ✓ ضمان 30 يوم
            </p>
          </div>
        </div>

        {/* ── DESKTOP: two-column ── */}
        <div className="hidden lg:block py-16 px-8 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
          <div className="relative max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">

            {/* Copy */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                🌟 تقنية طبية في راحة بيتكِ
              </span>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                باقة RF لشد الجلد<br />
                <span className="text-primary">ومحاربة السيلوليت</span>
              </h1>
              <p className="text-white/65 text-lg mb-6 leading-relaxed">
                تقنية طبية تصل لعمق الجلد — في بيتكِ، بخصوصية تامة
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'RF يحفز الكولاجين ويشد الجلد المترهل',
                  'موجات فوق صوتية تستهدف الدهون العنيدة',
                  'EMS يشد ويقوي العضلات تحت الجلد',
                  'جل التوصيل مُدرج في الباقة',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="text-primary flex-shrink-0 mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mb-4">
                <Stars />
                <span className="text-white/80 font-semibold">٤.٨/٥</span>
                <span className="text-white/45 text-sm">(+١٢٤ تقييم)</span>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-white/40 text-base line-through">٤٩٩ ريال</span>
                <span className="text-primary font-bold text-4xl">٢٣٩ <span className="text-xl font-normal text-white/70">ريال</span></span>
              </div>
              <a
                href="#order"
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all order-btn-pulse"
              >
                اطلبي الآن — الدفع عند الاستلام
              </a>
              <p className="text-white/35 text-xs mt-3">
                💵 دفع عند الاستلام · 🚚 شحن مجاني · ✓ ضمان 30 يوم
              </p>
            </div>

            {/* Product image */}
            <div className="relative">
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <Image
                  src="/images/lp/hero-pack.webp"
                  alt="باقة RF — نوفيا كلينيك"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 1280px) 50vw, 640px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. STORY STRIP                                            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPStoryStrip />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. EMPATHY                                                */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">
                جربتِ كل شيء… ولا تغيير شيء؟
              </h2>
              <p className="text-nuvia-text text-sm leading-relaxed mb-6">
                كريمات، رولات خشب، تمارين، محاولات… والسيلوليت ما راح. المشكلة ليست فيكِ — لأن الحلول اللي تشتغل على السطح لا تصل لمكان المشكلة. السيلوليت يتكون تحت الجلد، ولا شيء من قبل كان يعالج السبب.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '😔', text: 'جلد مترهل بعد الولادة أو فقدان الوزن' },
                  { icon: '😤', text: 'سيلوليت عنيد لا تزيله أي كريمات' },
                  { icon: '💸', text: 'جلسات العيادات باهظة الثمن ومتعبة' },
                  { icon: '🔄', text: 'جربتِ منتجات كثيرة دون نتائج حقيقية' },
                ].map((p) => (
                  <div key={p.text} className="flex items-center gap-3 bg-bg-alt rounded-xl p-3 border border-accent/50">
                    <span className="text-xl flex-shrink-0">{p.icon}</span>
                    <p className="text-nuvia-text text-xs font-medium">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-rose-100/70 to-orange-50/70 -z-10 blur-sm" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5 rotate-1">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/images/lp/failed-solutions.webp"
                    alt="منتجات مضادة للسيلوليت فاشلة"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
                  <span className="absolute bottom-3 right-3 bg-secondary/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm font-tajawal">
                    حلول جربتِها… وما اشتغلت
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. THE MECHANISM                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gradient-to-b from-secondary to-secondary/90 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
              الحل من الداخل — تقنية تصل لعمق
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              باقة نوفيا تجمع 3 تقنيات تشتغل مع بعض
            </h2>
            <p className="text-white/75 text-sm leading-relaxed max-w-lg mx-auto">
              لا معالجة سطحية — شغل من الداخل. الجل الناقل يوصّل الطاقة لعمق الجلد بأمان.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* 3 tech cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { icon: '🔴', tech: 'RF — الترددات الراديوية', desc: 'حرارة عميقة تصل للأدمة، تحفيز الكولاجين لشد الجلد المترهل.' },
                { icon: '🔵', tech: 'الموجات فوق الصوتية', desc: 'اهتزازات دقيقة تنشط الدورة الدموية وتستهدف الدهون العنيدة، تفتح الجلد للامتصاص أفضل.' },
                { icon: '⚡', tech: 'EMS — التحفيز العضلي', desc: 'نبضات لطيفة تشد العضلة تحت الجلد وتحسن المظهر العام بشكل مرئي.' },
              ].map((m) => (
                <div key={m.tech} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm flex gap-3 items-start">
                  <span className="text-2xl flex-shrink-0">{m.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{m.tech}</h3>
                    <p className="text-white/65 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
              <div className="bg-primary/20 rounded-2xl p-4 text-center text-sm font-medium">
                ✓ الجل الناقل: يوصّل الطاقة لعمق الجلد — بدونه الجهاز لا يشتغل صح.
              </div>
            </div>

            {/* Skin cross-section */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-primary/15 blur-xl" />
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,160,23,0.3)] ring-1 ring-primary/25">
                <Image
                  src="/images/lp/skin-cross-section.webp"
                  alt="مقطع جلد يوضح تأثير تقنية RF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md font-tajawal">
                  تقنية طبية معتمدة
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. DIPTYCH — Clinic vs Home                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            نفس النتيجة… بدون عيادة ولا إحراج
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">خصوصية تامة، على راحتكِ، وبتكلفة جلسة واحدة بس</p>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/10 aspect-video">
            <Image
              src="/images/lp/diptych-clinic-vs-home.webp"
              alt="مقارنة العيادة مع الاستخدام في البيت"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            {/* Text overlays */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/50">
                <span className="text-white font-bold text-sm sm:text-base font-tajawal">في العيادة</span>
                <span className="text-white/75 text-xs font-tajawal">مواعيد، تكلفة عالية، إحراج من الكشف</span>
              </div>
              <div className="w-1/2 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-primary/60">
                <span className="text-white font-bold text-sm sm:text-base font-tajawal">في بيتكِ ✨</span>
                <span className="text-white/90 text-xs font-tajawal">خصوصية تامة، على راحتكِ، وبتكلفة جلسة واحدة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. HOW IT WORKS                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-14 bg-bg-alt">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            كيف تستخدمين الجهاز؟
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">3 خطوات بسيطة — 15 دقيقة · 3 مرات أسبوعياً</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {[
                { n: '١', title: 'نظّفي البشرة وضعي الجل الناقل', desc: 'حطي طبقة سخية من الجل على المنطقة المستهدفة — هذا يوصّل الطاقة صح.' },
                { n: '٢', title: 'حرّكي الجهاز بحركات دائرية', desc: 'شغّلي الجهاز على الوضع المناسب وحرّكيه بدوائر بطيئة لمدة 15 دقيقة.' },
                { n: '٣', title: 'امسحي المنطقة وكرّري 3 مرات أسبوعياً', title2: 'اسحقي المنطقة، وكرّري 3 مرات أسبوعياً', desc: 'النتائج تبدأ من الأسبوع الثاني — والتزام 4 أسابيع يعطي فرق مرئي.' },
              ].map((s) => (
                <div key={s.n} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-accent/40">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-gold">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-sm mb-1">{s.title}</h3>
                    <p className="text-nuvia-text text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-accent/25 blur-lg -z-10" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_48px_rgba(212,160,23,0.2)] ring-1 ring-primary/20 -rotate-1">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/images/lp/tutorial-steps.webp"
                    alt="خطوات استخدام جهاز RF"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full font-tajawal">
                    ١٥ دقيقة · ٣ مرات أسبوعياً
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. AUTHORITY                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-6 sm:p-8 border border-accent/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative">
                <div className="absolute bottom-0 translate-x-2.5 translate-y-2.5 w-full h-3/4 rounded-2xl bg-primary/20 -z-10" />
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] ring-2 ring-primary/30">
                  <Image
                    src="/images/lp/authority-doctor.webp"
                    alt="استشارية العناية بالبشرة"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
                </div>
              </div>
              <div>
                <span className="inline-block bg-accent text-primary-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
                  تقنية معتمدة، آمنة للاستخدام المنزلي
                </span>
                <blockquote className="text-nuvia-text text-sm sm:text-base leading-relaxed mb-4 italic">
                  "التقنية اللي كانت حصر على العيادات، صارت متاحة في البيت — بشرط الاستمرار والاستخدام الصحيح."
                </blockquote>
                <p className="font-bold text-secondary text-sm">استشارية العناية بالبشرة</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['✅ شهادة CE', '✅ آمن للبشرة الحساسة', '✅ مُختبر طبياً'].map((b) => (
                    <span key={b} className="bg-white border border-accent text-nuvia-text text-xs px-3 py-1 rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. COMFORT — Pain scale                                   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg-alt">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-3">
            بدون ألم، بدون إبر
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">
            الإحساس مثل مساج دافئ بالحجر الساخن. لا حرق، لا ألم، ولا فترة نقاهة.
          </p>
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-50/60 to-emerald-50/60 -z-10 blur-md" />
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
              <Image
                src="/images/lp/pain-scale.webp"
                alt="مقارنة الألم — جهاز نوفيا مقابل طرق العيادات"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <span className="absolute top-3 left-3 bg-nuvia-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md font-tajawal">
                ✓ مريح تماماً
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-tajawal text-nuvia-text bg-white rounded-xl px-4 py-3 border border-accent">
            <span>الإبر والعمليات (ألم عالٍ) ←</span>
            <span className="text-primary font-bold">جهاز نوفيا (مساج دافئ مريح) ✓</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 9. REVIEWS CAROUSEL                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPReviewsCarousel />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 10. BEFORE / AFTER                                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            اليوم 1 · اليوم 14 · اليوم 28
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">
            نتائج حقيقية من عملياتنا — النتائج تختلف من شخص لآخر
          </p>

          {/* Horizontal scroll — 6 BA images */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 mb-8"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex-none w-52 sm:w-64 snap-start rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-accent/60 bg-white">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={`/images/ba/before-after-${n}.webp`}
                    alt={`نتيجة العميلة ${n}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 208px, 256px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/55 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                    <span className="bg-black/50 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm font-tajawal">قبل</span>
                    <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-tajawal">بعد ٤ أسابيع</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Texture close-up */}
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-nuvia-light text-xs mb-3">ملمس البشرة عن قرب — قبل وبعد</p>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/50 to-primary/10 blur-xl -z-10" />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(212,160,23,0.2)] ring-1 ring-primary/20">
                <Image
                  src="/images/lp/before-after-texture.webp"
                  alt="ملمس البشرة قبل وبعد استخدام جهاز RF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>
            <p className="text-center text-nuvia-light text-[11px] mt-2 font-tajawal">
              النتائج تختلف من شخص لآخر وترتبط بالاستمرار في الاستخدام.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 11. WHAT'S IN THE BOX                                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg-alt">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            شو موجود في الباقة؟
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">
            القيمة الكاملة ٤٩٩ ريال — اليوم بس ٢٣٩ ريال
          </p>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-accent/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { icon: '⚡', name: 'جهاز RF + موجات صوتية + EMS', desc: 'شاشة LED ذكية — 3 تقنيات في جهاز واحد' },
                { icon: '🧴', name: 'الجل الناقل Transound', desc: 'يوصّل الطاقة لعمق الجلد ويحمي البشرة أثناء الجلسة' },
                { icon: '🩹', name: 'وسادتَي EMS', desc: 'تلصق على المناطق المستهدفة للتحفيز العضلي' },
                { icon: '📖', name: 'دليل استخدام بالعربي', desc: 'خطوة بخطوة مع برنامج 4 أسابيع' },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-secondary text-sm">✓ {item.name}</p>
                    <p className="text-nuvia-light text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-6">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-accent/50 -z-10" />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(212,160,23,0.2)] ring-1 ring-primary/20">
                <Image
                  src="/images/lp/whats-in-box.webp"
                  alt="محتويات باقة RF من نوفيا"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 12. ORDER FORM                                            */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPOrderForm />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 13. GUARANTEE                                             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-bg-alt">
        <div className="max-w-md mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src="/images/lp/guarantee-badge.webp"
                alt="ضمان 30 يوم أو استرجاع كامل"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-block bg-nuvia-success/10 text-nuvia-success text-xs font-bold px-3 py-1 rounded-full mb-2">
                نتائج خلال 30 يوم أو استرجاع كامل
              </span>
              <h2 className="text-lg font-bold text-secondary mb-2">ضمان الرضا — 30 يوم كامل</h2>
              <p className="text-nuvia-text text-sm leading-relaxed">
                استخدمي الباقة 30 يوم بالطريقة الصحيحة، وإذا لا شفتِ فرق — نرجع لكِ مبلغك كاملاً بدون أي أسئلة. الخطأ علينا، لا عليكِ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 14. COD TRUST + DISCRETE DELIVERY                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold text-secondary text-center mb-6">
            توصيل سريع، دفع عند الاستلام، تغليف سري
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              {[
                { icon: '💵', title: 'دفع عند الاستلام', desc: 'تدفعين نقداً عند الاستلام — لا دفع مقدم، لا بطاقات بنكية.' },
                { icon: '📦', title: 'تغليف سري بدون عناوين', desc: 'الطلب يصل في صندوق بني عادي، بدون أي كلمة تكشف المحتوى.' },
                { icon: '🚚', title: 'توصيل خلال 2-5 أيام', desc: 'لجميع دول الخليج. شحن مجاني بدون شروط.' },
              ].map((s) => (
                <div key={s.title} className="flex items-start gap-3 bg-bg-alt rounded-xl p-4">
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  <div>
                    <p className="font-bold text-secondary text-sm">{s.title}</p>
                    <p className="text-nuvia-light text-xs leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <Image
                  src="/images/lp/cod-delivery.webp"
                  alt="توصيل الطلب ودفع عند الاستلام"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/70 to-transparent py-5 px-4">
                  <p className="text-white font-bold text-sm font-tajawal text-center">
                    ٢-٥ أيام · شحن مجاني لجميع دول الخليج
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 15. FAQ                                                   */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPFAQAccordion />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 16. FINAL CTA                                             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/90 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <span className="text-4xl block mb-4">✨</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">جاهزة تبدأين؟</h2>
          <p className="text-white/75 text-sm leading-relaxed mb-3">
            باقة كاملة بتقنية العيادات · ٢٣٩ ريال · دفع عند الاستلام · ضمان 30 يوم
          </p>
          <p className="text-white/60 text-xs mb-8">انضمي لأكثر من ١٠,٠٠٠ عميلة سعيدة في دول الخليج</p>
          <a
            href="#order"
            className="inline-flex items-center bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all order-btn-pulse"
          >
            اطلبي الآن — ادفعي عند الاستلام
          </a>
          <p className="text-white/40 text-xs mt-4">شحن مجاني · دفع عند الاستلام · ضمان 30 يوم</p>
        </div>
      </section>

      <LPStickyCTA />
    </div>
  );
}
