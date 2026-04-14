import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';

export default function ProductsShowcase() {
  return (
    <section className="py-16 bg-bg">
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

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
          >
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
}
