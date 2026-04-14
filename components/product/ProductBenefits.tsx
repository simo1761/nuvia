import { Product } from '@/data/products';
import SectionTitle from '@/components/shared/SectionTitle';
import OrderButton from '@/components/shared/OrderButton';

interface ProductBenefitsProps {
  product: Product;
}

export default function ProductBenefits({ product }: ProductBenefitsProps) {
  return (
    <section className="py-14 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="لماذا يعمل هذا المنتج؟"
          subtitle="تركيبة طبية طبيعية مدروسة لنتائج حقيقية"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {product.benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white rounded-xl p-5 border border-accent/40 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-nuvia-text text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>

        {/* How to use */}
        {product.howToUse.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-accent/40 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-secondary mb-5">طريقة الاستخدام</h3>
            <ol className="space-y-4">
              {product.howToUse.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-nuvia-text text-sm leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-accent/40 shadow-sm mb-10">
            <h3 className="text-xl font-bold text-secondary mb-4">المكونات الرئيسية</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, i) => (
                <span
                  key={i}
                  className="bg-bg-alt text-nuvia-text text-sm px-4 py-2 rounded-full border border-accent/60"
                >
                  🌿 {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <OrderButton label="اطلبي الآن وابدئي رحلتك ✨" size="lg" />
        </div>
      </div>
    </section>
  );
}
