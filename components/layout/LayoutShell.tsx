'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
const Footer = dynamic(() => import('./Footer'), { loading: () => null });

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />

    </>
  );
}
