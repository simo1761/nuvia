'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/#how-it-works', label: 'كيف يعمل' },
  { href: '/#reviews', label: 'التقييمات' },
  { href: '/#faq', label: 'الأسئلة الشائعة' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-72 bg-bg shadow-xl flex flex-col font-tajawal">
        <div className="flex items-center justify-between p-5 border-b border-accent">
          <span className="text-xl font-bold text-secondary">نوفيا كلينيك</span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="إغلاق القائمة"
          >
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-4 text-nuvia-text hover:bg-accent hover:text-secondary transition-colors text-base font-medium border-b border-accent/50"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="p-5 border-t border-accent">
          <a
            href="/#order"
            onClick={onClose}
            className="block w-full text-center bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-full font-bold text-base shadow-gold hover:shadow-gold-lg transition-all"
          >
            اطلبي الآن
          </a>
        </div>
      </div>
    </div>
  );
}
