'use client';

import { useState } from 'react';
import { faqItems } from '@/data/faq';
import SectionTitle from '@/components/shared/SectionTitle';

export default function ProductFAQ() {
  const [open, setOpen] = useState<string | null>(null);
  const items = faqItems.slice(0, 5);

  return (
    <section className="py-14 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="الأسئلة الشائعة عن هذا المنتج"
          subtitle="إجابات على أكثر الأسئلة شيوعاً"
        />

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-accent/40 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-bg-alt transition-colors"
              >
                <span className="font-semibold text-secondary text-sm sm:text-base">
                  {item.question}
                </span>
                <span
                  className={`text-primary transition-transform flex-shrink-0 mr-3 text-xl ${
                    open === item.id ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open === item.id && (
                <div className="px-5 pb-5 text-nuvia-text text-sm leading-relaxed border-t border-accent/30">
                  <p className="pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
