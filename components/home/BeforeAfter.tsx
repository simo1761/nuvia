import Image from 'next/image';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';

const cases = [
  {
    before: '/images/before-after/ba-1-before.jpg',
    after: '/images/before-after/ba-1-after.jpg',
    duration: 'بعد 30 يوم',
    area: 'منطقة الأفخاذ والأرداف',
    product: 'كيت مضاد السيلوليت',
  },
  {
    before: '/images/before-after/ba-2-before.jpg',
    after: '/images/before-after/ba-2-after.jpg',
    duration: 'بعد 45 يوم',
    area: 'منطقة البطن',
    product: 'البرنامج الكامل',
  },
  {
    before: '/images/before-after/ba-3-before.jpg',
    after: '/images/before-after/ba-3-after.jpg',
    duration: 'بعد 21 يوم',
    area: 'منطقة الأفخاذ',
    product: 'زيت نوفيا + فرشاة التدليك',
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-16 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="النتائج تتكلم بنفسها"
          subtitle="نتائج حقيقية من عميلاتنا — بدون تعديل أو فلاتر"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-accent/40 hover:shadow-gold transition-shadow duration-300"
            >
              {/* Before / After images side by side */}
              <div className="grid grid-cols-2 gap-0.5 bg-accent/30">
                {/* Before */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.before}
                    alt={`قبل — ${item.area}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 px-2">
                    <span className="text-white text-xs font-bold tracking-wide">قبل</span>
                  </div>
                </div>

                {/* After */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.after}
                    alt={`بعد — ${item.area}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-dark/70 to-transparent pt-6 pb-2 px-2">
                    <span className="text-white text-xs font-bold tracking-wide">بعد</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-nuvia-success flex-shrink-0" />
                  <span className="font-bold text-secondary text-sm">{item.duration}</span>
                </div>
                <p className="text-nuvia-light text-xs mb-0.5">📍 {item.area}</p>
                <p className="text-primary text-xs font-medium">✨ {item.product}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-nuvia-light text-xs">
            * النتائج تختلف من شخص لآخر وتعتمد على الاستخدام المنتظم.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3.5 rounded-full font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            احصلي على نفس النتائج ✨
          </Link>
        </div>
      </div>
    </section>
  );
}
