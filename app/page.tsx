import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import TrustBadges from '@/components/home/TrustBadges';
import Link from 'next/link';

// Below-the-fold — code-split to cut main-thread JS work
const ProductsShowcase  = dynamic(() => import('@/components/home/ProductsShowcase'));
const BeforeAfter       = dynamic(() => import('@/components/home/BeforeAfter'),       { ssr: false, loading: () => null });
const DoctorEndorsement = dynamic(() => import('@/components/home/DoctorEndorsement'), { ssr: false, loading: () => null });
const Testimonials      = dynamic(() => import('@/components/home/Testimonials'),      { ssr: false, loading: () => null });
const WhyNuvia          = dynamic(() => import('@/components/home/WhyNuvia'),          { ssr: false, loading: () => null });

export const metadata: Metadata = {
  title: 'نوفيا كلينيك – بشرة ناعمة بدون سيلوليت',
  description:
    'اكتشفي منتجات نوفيا الطبية الطبيعية لعلاج السيلوليت. نتائج مرئية خلال 30 يوم. شحن مجاني لجميع دول الخليج. الدفع عند الاستلام.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <ProductsShowcase />
      <BeforeAfter />
      <DoctorEndorsement />
      <Testimonials />
      <WhyNuvia />

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ابدئي رحلتك نحو بشرة مثالية اليوم
          </h2>
          <p className="text-white/85 text-lg mb-8">
            انضمي إلى أكثر من 10,000 عميلة سعيدة
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            تسوقي الآن
          </Link>
        </div>
      </section>
    </>
  );
}
