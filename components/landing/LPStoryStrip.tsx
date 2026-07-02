'use client';

const stories = [
  { label: 'البداية', color: 'from-red-200 to-red-50', img: '/images/stories/story-1.jpg' },
  { label: 'أسبوع ١', color: 'from-orange-200 to-orange-50', img: '/images/stories/story-2.jpg' },
  { label: 'أسبوع ٢', color: 'from-yellow-200 to-yellow-50', img: '/images/stories/story-3.jpg' },
  { label: 'أسبوع ٤', color: 'from-green-200 to-green-50', img: '/images/stories/story-4.jpg' },
  { label: 'النتيجة ✨', color: 'from-primary/40 to-accent', img: '/images/stories/story-5.jpg' },
];

export default function LPStoryStrip() {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-lg mx-auto px-4">
        <p className="text-center text-xs text-nuvia-light mb-5 font-tajawal font-medium">
          قصة هيفاء — تحول حقيقي في 4 أسابيع مع جهاز RF
        </p>
        <div className="flex gap-5 justify-center overflow-x-auto pb-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {stories.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${s.color} border-4 border-primary/60 overflow-hidden flex items-center justify-center shadow-gold`}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-xs text-nuvia-text font-tajawal font-semibold text-center whitespace-nowrap">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
