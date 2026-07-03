'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site-config';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to an email API
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            تواصل معنا
          </h1>
          <p className="text-nuvia-light text-lg">نحن هنا لمساعدتك</p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-accent/40 p-5 shadow-sm">
              <h2 className="font-bold text-secondary mb-4 text-lg">معلومات التواصل</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-alt">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0 text-lg">
                    📞
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">الهاتف</p>
                    <p className="text-nuvia-light" dir="ltr">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-alt">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0 text-lg">
                    📧
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">البريد الإلكتروني</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-alt">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0 text-lg">
                    🕐
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">ساعات العمل</p>
                    <p className="text-nuvia-light">{siteConfig.contact.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-alt">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0 text-lg">
                    📍
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">العنوان</p>
                    <p className="text-nuvia-light">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-accent/40 p-6 shadow-sm">
            <h2 className="font-bold text-secondary mb-5 text-lg">أرسلي لنا رسالة</h2>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-bold text-nuvia-success text-lg">تم إرسال رسالتك بنجاح!</p>
                <p className="text-nuvia-light text-sm mt-1">سنرد عليك في أقرب وقت ممكن</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-1.5">الاسم</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="اسمك الكامل"
                    className="w-full border border-accent rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full border border-accent rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-1.5">الرسالة</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="اكتبي رسالتك هنا..."
                    className="w-full border border-accent rounded-xl px-4 py-3 text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-bold text-sm shadow-gold hover:shadow-gold-lg transition-all"
                >
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
