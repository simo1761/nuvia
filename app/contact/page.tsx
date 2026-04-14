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
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">واتساب</p>
                    <p className="text-green-600">{siteConfig.contact.phone}</p>
                  </div>
                </a>

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
