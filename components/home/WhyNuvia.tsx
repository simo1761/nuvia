import SectionTitle from '@/components/shared/SectionTitle';

const reasons = [
  {
    icon: '🌿',
    title: 'مكونات طبيعية 100%',
    desc: 'كل منتجاتنا مصنوعة من مكونات طبيعية عالية الجودة خالية من المواد الكيماوية الضارة.',
  },
  {
    icon: '🔬',
    title: 'مجرّبة طبياً',
    desc: 'تركيبتنا تم تطويرها بالتعاون مع متخصصات في الجلدية وطب التجميل.',
  },
  {
    icon: '⚡',
    title: 'نتائج سريعة',
    desc: 'نتائج مرئية تبدأ من الأسبوع الأول مع الاستخدام المنتظم.',
  },
  {
    icon: '🛡️',
    title: 'آمن لجميع أنواع البشرة',
    desc: 'تركيبة لطيفة تناسب البشرة الحساسة وجميع أنواع البشرة.',
  },
  {
    icon: '🚀',
    title: 'شحن سريع',
    desc: 'توصيل خلال 2-5 أيام عمل لجميع دول الخليج.',
  },
  {
    icon: '💪',
    title: 'دعم مستمر',
    desc: 'فريق خدمة عملاء متاح عبر الواتساب لمساعدتك في كل خطوة.',
  },
];

export default function WhyNuvia() {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="لماذا نوفيا كلينيك؟"
          subtitle="نحن لا نبيع مجرد منتج — نقدم حلاً متكاملاً للعناية ببشرتك"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl flex-shrink-0">{reason.icon}</div>
              <div>
                <h3 className="font-bold text-white mb-1.5">{reason.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
