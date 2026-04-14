import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import SectionTitle from '@/components/shared/SectionTitle';

interface OtherProductsProps {
  currentSlug: string;
}

export default function OtherProducts({ currentSlug }: OtherProductsProps) {
  const others = products.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section className="py-14 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="منتجات أخرى قد تعجبك"
          subtitle="اكتملي تجربتك مع باقي منتجات نوفيا"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
