import { reviews } from '@/data/reviews';
import { Product } from '@/data/products';
import StarRating from '@/components/shared/StarRating';
import SectionTitle from '@/components/shared/SectionTitle';
import OrderButton from '@/components/shared/OrderButton';
import { formatDate } from '@/lib/utils';
import ProductPhotoReviews from '@/components/product/ProductPhotoReviews';

interface ProductReviewsProps {
  product: Product;
  showPhotoReviews?: boolean;
}

export default function ProductReviews({ product, showPhotoReviews }: ProductReviewsProps) {
  const productReviews = reviews.filter(
    (r) => !r.productId || r.productId === product.id
  ).slice(0, 6);

  // Rating distribution
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.floor(r.rating) === star).length,
  }));

  return (
    <section className="py-14 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="آراء عميلاتنا"
          subtitle="تقييمات حقيقية من عميلات فعليات"
        />

        {/* Summary */}
        <div className="bg-white border border-accent/40 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-6 items-center shadow-sm">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-1">{product.rating}</div>
            <StarRating rating={product.rating} size="lg" />
            <p className="text-nuvia-light text-sm mt-1">{product.reviewCount} تقييم</p>
          </div>
          <div className="flex-1 w-full">
            {dist.map(({ star, count }) => {
              const pct = Math.round((count / reviews.length) * 100);
              return (
                <div key={star} className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs text-nuvia-light w-4">{star}★</span>
                  <div className="flex-1 bg-bg-alt rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-nuvia-light w-8">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo review cards — horizontal scroll */}
        {showPhotoReviews && <ProductPhotoReviews />}

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {productReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-5 border border-accent/40 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">{review.name}</p>
                  <p className="text-xs text-nuvia-light">{review.city}</p>
                </div>
                <div className="mr-auto">
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </div>
              <p className="text-nuvia-text text-sm leading-relaxed mb-2">{review.text}</p>
              <p className="text-xs text-nuvia-light">{formatDate(review.date)}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <OrderButton label="اطلبي الآن" size="lg" />
        </div>
      </div>
    </section>
  );
}
