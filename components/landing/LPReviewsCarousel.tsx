'use client';

import Image from 'next/image';
import { reviews } from '@/data/reviews';

const extraReviews = [
  {
    id: '9',
    name: 'غادة م.',
    city: 'الرياض',
    rating: 5,
    text: 'جهاز RF من نوفيا غيّر حياتي! بعد الولادة كانت بشرتي مترهلة كثيراً، بعد 3 أسابيع فقط شفت شداً واضحاً. أفضل من الجلسات في العيادة بكثير.',
    date: '2025-01-10',
    photo: undefined as string | undefined,
  },
  {
    id: '10',
    name: 'شيماء د.',
    city: 'الكويت',
    rating: 5,
    text: 'جل التوصيل ممتاز جداً يمتص بسرعة ومريح جداً على البشرة. التوصيل وصل في يومين. بشرتي أنعم وأكثر إشراقاً. شكراً نوفيا!',
    date: '2025-01-20',
    photo: undefined as string | undefined,
  },
];

const allReviews = [
  ...reviews.map((r, i) => ({ ...r, photo: `/images/reviews/review${i + 1}.webp` as string | undefined })),
  ...extraReviews,
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= count ? 'text-primary' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
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
          آراء النساء اللي بدأن ✨
        </h2>
        <p className="text-center text-nuvia-light text-sm mb-8 font-tajawal">
          +124 تقييم حقيقي — متوسط ⭐ 4.8/5
        </p>

        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {allReviews.map((r) => (
            <div
              key={r.id}
              className="flex-none w-52 sm:w-60 snap-start bg-white rounded-2xl shadow-md border border-accent/60 overflow-hidden"
            >
              {/* Photo */}
              {r.photo && (
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={r.photo}
                    alt={r.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 208px, 240px"
                  />
                  <span className="absolute top-2 right-2 bg-nuvia-success text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-tajawal">
                    مشترية موثوقة ✓
                  </span>
                </div>
              )}

              {/* Text */}
              <div className="p-3">
                <Stars count={r.rating} />
                <p className="text-nuvia-text text-xs leading-relaxed mt-2 font-tajawal line-clamp-3">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-accent/40">
                  {!r.photo && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center text-secondary font-bold text-xs flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-secondary font-semibold text-xs font-tajawal">{r.name}</p>
                    <p className="text-nuvia-light text-[10px] font-tajawal">{r.city}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-nuvia-light text-xs mt-2 font-tajawal">← اسحبي للمزيد</p>
      </div>
    </section>
  );
}
