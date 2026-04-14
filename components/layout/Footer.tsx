import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white font-tajawal">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">
                نوفيا <span className="text-primary">كلينيك</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              نوفيا كلينيك – الحل الأمثل للسيلوليت. منتجات طبية طبيعية مصنوعة لبشرة أنعم وأكثر ثقة.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-primary transition-colors rounded-full flex items-center justify-center"
                aria-label="إنستغرام"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-primary transition-colors rounded-full flex items-center justify-center"
                aria-label="تيك توك"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.55V6.86a4.85 4.85 0 01-1.07-.17z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-primary transition-colors rounded-full flex items-center justify-center"
                aria-label="سناب شات"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.49-.104.464 0 .927.301.927.722 0 .47-.235.931-1.138 1.216-.18.058-.85.385-2.116.422C17.71 13.569 17.14 14.5 17 14.699c-.286.428-.607.781-.87 1.128-.287.375-.53.727-.53 1.045.003.22.125.44.365.54 2.054.854 3.318 1.71 4.043 2.43 1.143 1.163.988 2.286.988 2.286.025.15-.047.355-.207.433l-.04.018a18.437 18.437 0 01-3.027.587c-.285.044-.595.206-.774.417-.21.238-.415.504-.614.765-.405.524-.82 1.064-1.491 1.064-.2 0-.4-.04-.606-.122-.224-.088-.44-.157-.714-.157-.28 0-.523.072-.76.161-.223.086-.44.127-.641.127-.558 0-.95-.404-1.304-.867-.332-.436-.699-.885-.999-1.199C9.28 23.49 8.805 23.36 8.418 23.3c-.77-.12-1.504-.243-2.113-.494a.83.83 0 01-.052-.022.426.426 0 01-.207-.433s-.155-1.123.989-2.286c.724-.72 1.988-1.576 4.042-2.43.24-.1.362-.32.365-.54 0-.318-.243-.67-.53-1.045-.263-.347-.585-.7-.87-1.128-.14-.199-.711-1.13-1.197-2.498-1.267-.037-1.937-.363-2.116-.422-.904-.285-1.139-.745-1.139-1.216 0-.421.463-.722.927-.722.147 0 .326.016.49.104.374.181.734.285 1.033.301.2 0 .327-.045.401-.09l-.03-.51-.003-.06C7.597 4.89 7.47 2.864 8 1.671 9.583 1.069 11.215.793 12.206.793z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-primary transition-colors rounded-full flex items-center justify-center"
                aria-label="تويتر"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-base mb-4 text-primary">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/products', label: 'المنتجات' },
                { href: '/blog', label: 'المدونة' },
                { href: '/about', label: 'من نحن' },
                { href: '/faq', label: 'الأسئلة الشائعة' },
                { href: '/contact', label: 'تواصل معنا' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-base mb-4 text-primary">السياسات</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/shipping-policy', label: 'سياسة الشحن' },
                { href: '/return-policy', label: 'سياسة الإرجاع' },
                { href: '/faq', label: 'الأسئلة الشائعة' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4 text-primary">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  واتساب
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>{siteConfig.contact.workingHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© {year} نوفيا كلينيك. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 px-3 py-1 rounded text-xs font-medium">💵 دفع عند الاستلام</span>
            <span className="bg-white/10 px-3 py-1 rounded text-xs font-medium">🚚 شحن مجاني</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
