import Image from 'next/image';
import SectionTitle from '@/components/shared/SectionTitle';

const cases = [
  {
    before: '/images/before-after/ba-1-before.jpg',
    after: '/images/before-after/ba-1-after.jpg',
    duration: 'بعد 30 يوم',
    area: 'منطقة الأفخاذ والأرداف',
  },
  {
    before: '/images/before-after/ba-3-before.jpg',
    after: '/images/before-after/ba-3-after.jpg',
    duration: 'بعد 21 يوم',
    area: 'منطقة الأفخاذ',
  },
];

export default function ProductBeforeAfter() {
  return (
    <section className="py-14 bg-bg-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="نتائج حقيقية من عميلاتنا"
          subtitle="صور فعلية بدون أي تعديل أو فلاتر"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-accent/40 shadow-sm"
            >
              <div className="grid grid-cols-2 gap-0.5 bg-accent/30">
                {/* Before */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.before}
                    alt={`قبل — ${item.area}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 px-2">
                    <span className="text-white text-xs font-bold">قبل</span>
                  </div>
                </div>

                {/* After */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.after}
                    alt={`بعد — ${item.area}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-dark/70 to-transparent pt-6 pb-2 px-2">
                    <span className="text-white text-xs font-bold">بعد</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-nuvia-success flex-shrink-0" />
                <div>
                  <span className="font-bold text-secondary text-sm">{item.duration}</span>
                  <span className="text-nuvia-light text-sm"> · {item.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-nuvia-light text-xs mt-5">
          * النتائج تختلف من شخص لآخر وتعتمد على الاستخدام المنتظم.
        </p>
      </div>
    </section>
  );
}
