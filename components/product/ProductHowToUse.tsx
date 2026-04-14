import Image from 'next/image';
import SectionTitle from '@/components/shared/SectionTitle';

const steps = [
  {
    step: 1,
    image: '/images/how-to-use/howto-1.webp',
    title: 'جهّزي الزيت',
    desc: 'رجّي قارورة زيت الزنجبيل جيداً، ثم ضعي كمية مناسبة في راحة يدك. اختاري المنطقة المستهدفة (الأفخاذ، الأرداف أو البطن).',
  },
  {
    step: 2,
    image: '/images/how-to-use/howto-2.webp',
    title: 'وزّعي الزيت',
    desc: 'ضعي قطرات الزيت مباشرةً على البشرة ووزّعيها بحركات خفيفة بالأصابع حتى تغطي المنطقة بالكامل. لا تتركي الزيت يجف.',
  },
  {
    step: 3,
    image: '/images/how-to-use/howto-3.webp',
    title: 'ادلّكي بالجهاز',
    desc: 'شغّلي جهاز التدليك وحرّكيه بحركات دائرية على المنطقة لمدة ٥ إلى ١٠ دقائق. كرّري العملية يومياً للحصول على نتائج مرئية خلال ٣٠ يوماً.',
  },
];

export default function ProductHowToUse() {
  return (
    <section className="py-14 bg-white border-t border-accent/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="طريقة الاستخدام"
          subtitle="٣ خطوات بسيطة — نتائج مرئية خلال ٣٠ يوماً"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
          {steps.map(({ step, image, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center">
              {/* Image */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-accent/30 mb-5">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 90vw, 30vw"
                />
                {/* Step badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {step}
                </div>
              </div>

              {/* Text */}
              <h4 className="font-bold text-secondary text-base mb-2">{title}</h4>
              <p className="text-nuvia-text text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 flex gap-3 items-start">
          <span className="text-xl leading-none mt-0.5">💡</span>
          <p className="text-sm text-nuvia-text leading-relaxed">
            <span className="font-bold text-secondary">نصيحة: </span>
            للحصول على أفضل النتائج، استخدمي الكيت بعد الاستحمام مباشرةً عندما تكون المسام مفتوحة، وكرّري العملية صباحاً ومساءً.
          </p>
        </div>
      </div>
    </section>
  );
}
