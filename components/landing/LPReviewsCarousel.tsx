'use client';

import { reviews } from '@/data/reviews';

const extraReviews = [
  {
    id: '9',
    name: 'غادة المنصور',
    city: 'الرياض',
    rating: 5,
    text: 'جهاز RF من نوفيا غيّر حياتي! بعد الولادة كانت بشرتي مترهلة كثيراً، بعد 3 أسابيع فقط شفت شداً واضحاً. المنتج أفضل من الجلسات في العيادة.',
    date: '2025-01-10',
  },
  {
    id: '10',
    name: 'شيماء الدوسري',
    city: 'الكويت',
    rating: 5,
    text: 'الكريم المرفق مع الجهاز ممتاز جداً، يمتص بسرعة وبشرتي صبحت أنعم. التوصيل وصل في يومين. شكراً نوفيا!',
    date: '2025-01-20',
  },
];

const allReviews = [...reviews, ...extraReviews];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? 'text-primary' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function LPReviewsCarousel() {
  return (
    <section id="reviews" className="py-14 bg-bg-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary text-center mb-2 font-tajawal">
          ماذا تقول عملياتنا؟
        </h2>
        <p className="text-center text-nuvia-light text-sm mb-8 font-tajawal">
          +١٢٤ تقييم حقيقي — متوسط ⭐ ٤.٨/٥
        </p>
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {allReviews.map((r) => (
            <div
              key={r.id}
              className="flex-none w-72 sm:w-80 snap-start bg-white rounded-2xl p-5 shadow-md border border-accent/60 flex flex-col gap-3"
            >
              <Stars count={r.rating} />
              <p className="text-nuvia-text text-sm leading-relaxed font-tajawal line-clamp-4">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-accent/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-secondary font-semibold text-sm font-tajawal">{r.name}</p>
                  <p className="text-nuvia-light text-xs font-tajawal">{r.city}</p>
                </div>
                <span className="text-xs text-nuvia-success font-tajawal mr-auto">✓ تم التحقق</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-nuvia-light text-xs mt-2 font-tajawal">← اسحبي للمزيد</p>
      </div>
    </section>
  );
}
