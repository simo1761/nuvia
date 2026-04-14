'use client';

import { useState } from 'react';
import { faqItems } from '@/data/faq';

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            الأسئلة الشائعة
          </h1>
          <p className="text-nuvia-light text-lg">
            إجابات على أكثر الأسئلة التي تصلنا من عميلاتنا
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mt-3" />
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-accent/40 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-bg-alt transition-colors"
              >
                <span className="font-semibold text-secondary">{item.question}</span>
                <span
                  className={`text-primary transition-transform flex-shrink-0 mr-4 text-2xl leading-none ${
                    open === item.id ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open === item.id && (
                <div className="px-5 pb-5 border-t border-accent/30">
                  <p className="text-nuvia-text text-sm leading-relaxed pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-secondary font-semibold mb-2">لديك سؤال آخر؟</p>
          <p className="text-nuvia-light text-sm mb-4">
            فريقنا جاهز للإجابة على جميع استفساراتك
          </p>
          <a
            href="https://wa.me/966XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors"
          >
            تواصلي معنا عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
