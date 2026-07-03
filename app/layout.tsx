import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';
import { siteConfig } from '@/data/site-config';

const TrackingPixels = dynamic(() => import('@/components/tracking/TrackingPixels'), { ssr: false, loading: () => null });

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.nameAr} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.nameAr}`,
  },
  description: siteConfig.description,
  keywords: [
    'سيلوليت',
    'علاج السيلوليت',
    'زيت ضد السيلوليت',
    'نوفيا كلينيك',
    'بشرة ناعمة',
    'كيت مضاد للسيلوليت',
    'منتجات طبية طبيعية',
  ],
  metadataBase: new URL(`https://${siteConfig.domain}`),
  openGraph: {
    title: `${siteConfig.nameAr} – ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.nameAr,
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.nameAr} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-tajawal bg-bg text-nuvia-text antialiased">
        <TrackingPixels />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
