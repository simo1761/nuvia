import type { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const LPStoryStrip      = dynamic(() => import('@/components/landing/LPStoryStrip'));
const LPReviewsCarousel = dynamic(() => import('@/components/landing/LPReviewsCarousel'));
const LPOrderForm       = dynamic(() => import('@/components/landing/LPOrderForm'));
const LPFAQAccordion    = dynamic(() => import('@/components/landing/LPFAQAccordion'));
const LPStickyCTA       = dynamic(() => import('@/components/landing/LPStickyCTA'), { ssr: false });

export const metadata: Metadata = {
  title: 'باقة RF لشد الجلد — نوفيا كلينيك',
  description:
    'جهاز الترددات الراديوية RF الاحترافي + كريم الشد. تقنية طبية لبشرة أكثر شباباً. شحن مجاني · دفع عند الاستلام · ضمان 30 يوم.',
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

function ImgPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-accent to-primary/20 rounded-2xl flex items-center justify-center ${className}`}>
      <span className="text-nuvia-light text-[11px] font-mono px-3 text-center leading-relaxed">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="font-tajawal" dir="rtl">

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO                                                    */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-bg-alt to-bg py-10 sm:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Product Image */}
            <div className="flex justify-center lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <Image
                  src="/images/products/pack_rf.webp"
                  alt="باقة RF لشد الجلد — نوفيا"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Copy */}
            <div className="lg:order-1 text-center lg:text-right">
              <span className="inline-block bg-accent text-primary-dark text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                🌟 تقنية طبية في راحة بيتكِ
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight mb-4">
                اشدّي جلدكِ<br />
                <span className="text-primary">وجددي نضارتكِ</span><br />
                في 4 أسابيع
              </h1>
              <p className="text-nuvia-text text-base sm:text-lg mb-6 leading-relaxed">
                جهاز RF الاحترافي + كريم الشد المتخصص — الحل الأمثل للجلد المترهل والسيلوليت العنيد
              </p>

              <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
                <Stars />
                <span className="text-nuvia-text text-sm font-semibold">٤.٨/٥</span>
                <span className="text-nuvia-light text-sm">(+١٢٤ تقييم)</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-7">
                {['🚚 شحن مجاني', '💵 دفع عند الاستلام', '🔄 ضمان 30 يوم'].map((b) => (
                  <span key={b} className="bg-white border border-accent text-nuvia-text text-xs px-3 py-1.5 rounded-full shadow-sm font-medium">
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#order"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all order-btn-pulse"
                >
                  اطلبي الآن — ٢٩٩ ريال 🛒
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center border-2 border-accent text-secondary px-6 py-4 rounded-full font-semibold text-sm hover:border-primary/50 transition-colors"
                >
                  كيف يعمل؟ ⬇
                </a>
              </div>
              <p className="text-nuvia-light text-xs mt-4">⚠️ الكمية محدودة — الطلب يُشحن خلال 24 ساعة</p>
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
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-3">
            هل تعانين من هذه المشاكل؟
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">إذا قلتِ "نعم" لأي منها، فباقة RF هي الحل</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '😔', text: 'جلد مترهل بعد الولادة أو فقدان الوزن' },
              { icon: '😤', text: 'سيلوليت عنيد لا تزيله أي كريمات' },
              { icon: '💸', text: 'جلسات العيادات باهظة الثمن ومتعبة' },
              { icon: '⏰', text: 'لا وقت للمواعيد والانتقالات' },
              { icon: '😞', text: 'بشرة فقدت نضارتها ومرونتها' },
              { icon: '🔄', text: 'جربتِ منتجات كثيرة دون نتائج حقيقية' },
            ].map((p) => (
              <div key={p.text} className="flex items-center gap-3 bg-bg-alt rounded-xl p-4 border border-accent/50">
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <p className="text-nuvia-text text-sm font-medium">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. THE MECHANISM                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gradient-to-b from-secondary to-secondary/90 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
            العلم وراء النتائج
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            لماذا تقنية RF تختلف عن كل ما جربتِه؟
          </h2>
          <p className="text-white/75 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            معظم الكريمات تعمل على السطح فقط. الحقيقة: السيلوليت والترهل ينشآن في الطبقات العميقة تحت الجلد. تقنية RF هي الوحيدة القادرة على الوصول إليها.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '①', title: 'طاقة حرارية عميقة', desc: 'الترددات الراديوية تخترق الجلد وتصل لطبقة الكولاجين مباشرة' },
              { step: '②', title: 'تحفيز الكولاجين', desc: 'الحرارة تنبّه الخلايا لإنتاج كولاجين جديد وشد الألياف القديمة' },
              { step: '③', title: 'شد تدريجي طبيعي', desc: 'النتيجة: بشرة أكثر شداً وسيلوليت أقل وضوحاً خلال 4 أسابيع' },
            ].map((m) => (
              <div key={m.step} className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <span className="text-primary text-3xl font-bold block mb-2">{m.step}</span>
                <h3 className="font-bold mb-2 text-sm">{m.title}</h3>
                <p className="text-white/65 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. DIPTYCH — Before/After                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            قبل وبعد استخدام جهاز RF
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">نتائج حقيقية من عملياتنا — 4 أسابيع فقط</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <ImgPlaceholder label="قبل — الأسبوع 0" className="w-full aspect-[3/4]" />
              <p className="text-nuvia-light text-xs font-semibold mt-2">قبل</p>
            </div>
            <div className="text-center">
              <ImgPlaceholder label="بعد — الأسبوع 4 ✨" className="w-full aspect-[3/4]" />
              <p className="text-primary text-xs font-bold mt-2">بعد ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. HOW IT WORKS                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-14 bg-bg-alt">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            كيف تستخدمين الجهاز؟
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-10">3 خطوات بسيطة — 20 دقيقة · 3 مرات أسبوعياً</p>
          <div className="space-y-5">
            {[
              { n: '١', title: 'ضعي الكريم', desc: 'ضعي طبقة سخية من كريم الشد على المنطقة المستهدفة' },
              { n: '٢', title: 'شغّلي الجهاز', desc: 'اختاري الوضع المناسب لبشرتكِ (3 مستويات حرارة)' },
              { n: '٣', title: 'حركي بدوائر', desc: 'حركي الجهاز ببطء بحركات دائرية صغيرة لمدة 20 دقيقة' },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm border border-accent/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-gold">
                  {s.n}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-secondary mb-1">{s.title}</h3>
                  <p className="text-nuvia-text text-sm leading-relaxed">{s.desc}</p>
                </div>
                <ImgPlaceholder label={`خطوة ${s.n}`} className="w-16 h-16 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. AUTHORITY                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-6 sm:p-8 border border-accent/60 text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/30 shadow-gold">
              <ImgPlaceholder label="صورة" className="w-full h-full rounded-full" />
            </div>
            <Stars />
            <blockquote className="text-nuvia-text text-sm sm:text-base leading-relaxed my-5 italic">
              "تقنية RF الجديدة من نوفيا حققت نتائج مذهلة. أنصح بها كبديل احترافي للجلسات العيادية المكلفة. الجهاز آمن ومُختبر طبياً."
            </blockquote>
            <p className="font-bold text-secondary">د. هناء السالم</p>
            <p className="text-nuvia-light text-xs mb-4">أخصائية التجميل والعناية بالجلد — الرياض</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['✅ مُختبر طبياً', '✅ آمن للبشرة الحساسة', '✅ معتمد دولياً'].map((b) => (
                <span key={b} className="bg-white border border-accent text-nuvia-text text-xs px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. COMPARISON TABLE                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg-alt">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-8">
            لماذا نوفيا RF؟
          </h2>
          <div className="overflow-hidden rounded-2xl border border-accent shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="py-3 px-4 text-right font-semibold">المقارنة</th>
                  <th className="py-3 px-2 text-center font-semibold text-xs">كريمات عادية</th>
                  <th className="py-3 px-2 text-center font-semibold text-xs">جلسات عيادة</th>
                  <th className="py-3 px-2 text-center font-semibold text-xs bg-primary/80">نوفيا RF</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: 'التكلفة',   vals: ['٥٠–٢٠٠ ر.س', '+٥٠٠/جلسة', '٢٩٩ ر.س'] },
                  { aspect: 'الفاعلية', vals: ['محدودة', 'عالية', 'عالية ✓'] },
                  { aspect: 'الراحة',   vals: ['في البيت', 'مواعيد', 'في البيت ✓'] },
                  { aspect: 'الوقت',    vals: ['يومي', 'أسبوعي', '20 دق × 3'] },
                  { aspect: 'النتائج',  vals: ['٤-٦ أشهر', '٤-٨ جلسات', '٢-٤ أسابيع ✓'] },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-bg-alt'}>
                    <td className="py-3 px-4 font-medium text-secondary text-sm">{row.aspect}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className={`py-3 px-2 text-center text-xs ${j === 2 ? 'font-bold text-primary' : 'text-nuvia-text'}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <a
              href="#order"
              className="inline-flex items-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-bold shadow-gold hover:shadow-gold-lg transition-all"
            >
              اطلبي الآن بسعر مخفض 🎁
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 9. REVIEWS CAROUSEL                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPReviewsCarousel />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 10. BEFORE/AFTER GRID                                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            نتائج حقيقية من عملياتنا
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">كل صورة مع تقييم حقيقي مُتحقق منه</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-2">
                <ImgPlaceholder label={`قبل ${n}`} className="w-full aspect-square" />
                <ImgPlaceholder label={`بعد ${n} ✨`} className="w-full aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 11. WHAT'S IN THE BOX                                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-bg-alt">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2">
            ماذا يوجد في الباقة؟
          </h2>
          <p className="text-center text-nuvia-light text-sm mb-8">كل ما تحتاجينه لبدء رحلتكِ</p>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-accent/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {[
                { icon: '⚡', name: 'جهاز RF الاحترافي', desc: 'بشاشة LED ذكية وحلقة ذهبية فاخرة — 3 مستويات حرارة' },
                { icon: '🧴', name: 'كريم الشد المتخصص', desc: 'معزز بالببتيدات وحمض الهيالورونيك وفيتامين C' },
                { icon: '🔌', name: 'كابل شحن USB', desc: 'يعمل مع أي مقبس كهربائي في دول الخليج' },
                { icon: '📖', name: 'دليل الاستخدام', desc: 'بالعربية — خطوة بخطوة مع برنامج 4 أسابيع' },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-secondary text-sm">{item.name}</p>
                    <p className="text-nuvia-light text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <ImgPlaceholder label="صورة محتويات الباقة" className="w-full h-44 sm:h-56" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 12. ORDER FORM (main conversion element)                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPOrderForm />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 13. GUARANTEE                                             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-bg-alt">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-nuvia-success/10 border-4 border-nuvia-success/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🛡️</span>
          </div>
          <h2 className="text-xl font-bold text-secondary mb-3">ضمان الرضا — 30 يوم كامل</h2>
          <p className="text-nuvia-text text-sm leading-relaxed max-w-sm mx-auto">
            إذا لم تكوني راضية عن النتائج لأي سبب خلال 30 يوماً من الاستلام، نعيد لكِ المبلغ كاملاً بدون أي أسئلة. أنتِ لا تخسرين شيئاً.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 14. COD TRUST                                             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl font-bold text-secondary text-center mb-6">كيف يعمل نظام الدفع عند الاستلام؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '📝', title: 'سجّلي طلبكِ',     desc: 'اختاري الباقة واملئي اسمكِ ورقم هاتفكِ' },
              { icon: '📞', title: 'تأكيد المكالمة',  desc: 'سيتصل بكِ فريقنا لتأكيد العنوان والشحن' },
              { icon: '💵', title: 'ادفعي عند الاستلام', desc: 'تسلّمي الطرد وادفعي للمندوب فقط' },
            ].map((s) => (
              <div key={s.title} className="text-center bg-bg-alt rounded-2xl p-5">
                <span className="text-3xl block mb-2">{s.icon}</span>
                <h3 className="font-bold text-secondary text-sm mb-1">{s.title}</h3>
                <p className="text-nuvia-light text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">بشرتكِ تستحق الأفضل</h2>
          <p className="text-white/75 text-sm leading-relaxed mb-8">
            انضمي لأكثر من ١٠,٠٠٠ عميلة سعيدة في دول الخليج. اليوم هو يومكِ.
          </p>
          <a
            href="#order"
            className="inline-flex items-center bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all order-btn-pulse"
          >
            احجزي باقتكِ الآن 🛒
          </a>
          <p className="text-white/50 text-xs mt-4">شحن مجاني · دفع عند الاستلام · ضمان 30 يوم</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* STICKY CTA (mobile only, client-side)                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <LPStickyCTA />
    </div>
  );
}
