import SectionTitle from '@/components/shared/SectionTitle';

const doctors = [
  {
    name: 'د. سارة الحميد',
    specialty: 'أخصائية جلدية',
    quote:
      'منتجات نوفيا تحتوي على تركيبة من زيت الزنجبيل الطبيعي المعروف بفعاليته في تحسين الدورة الدموية وتقليل مظهر السيلوليت. أنصح عميلاتي باستخدامها كجزء من روتين العناية اليومي.',
    initials: 'سح',
  },
  {
    name: 'د. فاطمة الراشد',
    specialty: 'أخصائية طب تجميل',
    quote:
      'التدليك المنتظم مع الزيوت الطبيعية من أفضل الحلول غير الجراحية لعلاج السيلوليت. نوفيا كلينيك قدمت منتجاً متكاملاً يجمع بين الجودة والفعالية.',
    initials: 'فر',
  },
  {
    name: 'د. منى السلمان',
    specialty: 'أخصائية تغذية علاجية',
    quote:
      'المكونات الطبيعية في منتجات نوفيا مثل زيت الزنجبيل وفيتامين E تدعم صحة البشرة من الخارج. توصيتي هي الجمع بين الاستخدام الموضعي وشرب الماء الكافي للحصول على أفضل النتائج.',
    initials: 'مس',
  },
];

export default function DoctorEndorsement() {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="موصى به من أطباء الجلدية"
          subtitle="آراء متخصصات في الجلدية وطب التجميل"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white border border-accent rounded-2xl p-6 shadow-sm relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif leading-none select-none">
                "
              </div>

              {/* Stethoscope icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {doctor.initials}
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">{doctor.name}</p>
                  <p className="text-nuvia-light text-xs">{doctor.specialty}</p>
                </div>
              </div>

              <blockquote className="text-nuvia-text text-sm leading-relaxed">
                {doctor.quote}
              </blockquote>

              {/* Verified badge */}
              <div className="flex items-center gap-1 mt-4">
                <span className="text-nuvia-success text-xs">✅</span>
                <span className="text-xs text-nuvia-light">طبيب متحقق</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
