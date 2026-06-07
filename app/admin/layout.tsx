import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuvia Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {children}
    </div>
  );
}
