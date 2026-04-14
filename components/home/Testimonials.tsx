'use client';

import { useState } from 'react';
import { reviews } from '@/data/reviews';
import StarRating from '@/components/shared/StarRating';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatDate } from '@/lib/utils';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const total = reviews.length;
  const pages = Math.ceil(total / perPage);

  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-16 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="ماذا تقول عميلاتنا"
          subtitle="تقييمات حقيقية من عميلات فعليات"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {visible.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-accent/40 relative"
            >
              {/* Arabic quote */}
              <div className="text-5xl text-primary/15 font-serif leading-none absolute top-3 right-5 select-none">
                «
              </div>

              {/* Stars */}
              <div className="mb-3">
                <StarRating rating={review.rating} size="sm" />
              </div>

              <p className="text-nuvia-text text-sm leading-relaxed mb-4 relative z-10">
                {review.text}
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">{review.name}</p>
                  <p className="text-nuvia-light text-xs">{review.city} · {formatDate(review.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {pages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? 'bg-primary w-6' : 'bg-primary/30'
                }`}
                aria-label={`الصفحة ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-white border border-accent px-6 py-3 rounded-full shadow-sm">
            <StarRating rating={4.8} size="md" />
            <span className="font-bold text-secondary">4.8/5</span>
            <span className="text-nuvia-light text-sm">من أكثر من 800 تقييم</span>
          </div>
        </div>
      </div>
    </section>
  );
}
