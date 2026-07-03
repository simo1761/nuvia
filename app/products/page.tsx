import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata: Metadata = {
  title: 'منتجاتنا | نوفيا كلينيك',
  description:
    'اكتشفي مجموعة نوفيا المتكاملة لعلاج السيلوليت. كيت مضاد السيلوليت، زيت الزنجبيل، فرشاة التدليك الاحترافية، والبرنامج الكامل.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="منتجاتنا"
          subtitle="اكتشفي مجموعة نوفيا المتكاملة لعلاج السيلوليت"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 bg-white border border-accent/40 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-secondary mb-3">
            ��ا تعرفي أي منتج يناسبك؟
          </h2>
          <p className="text-nuvia-light mb-5">
            تواصلي مع فريق خدمة العملاء وسنساعدك في اختيار المنتج المثالي لاحتياجاتك
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-full font-bold transition-colors shadow-gold"
          >
            📧 تواصلي مع فريق الدعم
          </a>
        </div>
      </div>
    </div>
  );
}
