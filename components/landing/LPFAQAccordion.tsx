'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'كيف يعمل جهاز RF لشد الجلد؟',
    a: 'تقنية RF (الترددات الراديوية) تُطلق طاقة حرارية عميقة تحت الجلد تحفّز خلايا الكولاجين على الإنتاج والتجدد. النتيجة: شد طبيعي تدريجي وتقليل مظهر الترهل والسيلوليت من الجذور.',
  },
  {
    q: 'متى تظهر النتائج الأولى؟',
    a: 'كثيرات من عملياتنا لاحظن نعومة البشرة بعد الجلسة الأولى! النتائج المرئية في الشد وتقليل السيلوليت تظهر عادةً بعد أسبوعين إلى 4 أسابيع من الاستخدام 3 مرات أسبوعياً.',
  },
  {
    q: 'هل الجهاز آمن للاستخدام في البيت؟',
    a: 'نعم، جهاز نوفيا RF مصمم خصيصاً للاستخدام المنزلي الآمن. يحتوي على نظام حماية تلقائي لدرجة الحرارة ولا يتطلب أي خبرة طبية. مناسب لجميع أنواع البشرة.',
  },
  {
    q: 'هل الشحن مجاني؟',
    a: 'نعم! الشحن مجاني تماماً لجميع دول الخليج: المملكة العربية السعودية، الكويت، الإمارات، البحرين، عُمان، وقطر. التوصيل خلال 2-4 أيام عمل.',
  },
  {
    q: 'كيف يتم الدفع؟ هل الدفع آمن؟',
    a: 'نعتمد فقط نظام الدفع عند الاستلام (COD) — تدفعين فقط عند وصول المنتج إلى باب بيتكِ. لا بطاقات بنكية، لا دفع مسبق، لا مخاطر.',
  },
  {
    q: 'ما هي سياسة الإرجاع والضمان؟',
    a: 'نضمن رضاكِ التام. إذا لم تشهدي أي تحسن خلال 30 يوماً من الاستخدام المنتظم، نستقبل المنتج ونعيد لكِ المبلغ كاملاً بدون أي أسئلة.',
  },
];

export default function LPFAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-8 font-tajawal">
          الأسئلة الشائعة
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="border border-accent rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-right font-tajawal font-semibold text-secondary hover:bg-bg-alt transition-colors"
              >
                <span className="text-sm sm:text-base">{item.q}</span>
                <svg
                  className={`w-5 h-5 text-primary flex-shrink-0 mr-3 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 pt-1 text-nuvia-text text-sm leading-relaxed font-tajawal bg-bg-alt">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
