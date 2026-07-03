import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LayoutShell from '@/components/layout/LayoutShell';
import { siteConfig } from '@/data/site-config';

// Read at request time (server component) — works even if not set at build time
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '571480235951205';

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
      <head>
        {/* Preconnect to Facebook CDN — reduces pixel load latency */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
      </head>
      <body className="font-tajawal bg-bg text-nuvia-text antialiased">
        <LayoutShell>{children}</LayoutShell>

        {/* Meta Pixel — afterInteractive: loads after page is usable, never blocks render */}
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
          s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL_ID}');
          fbq('track','PageView');
        `}</Script>
      </body>
    </html>
  );
}
