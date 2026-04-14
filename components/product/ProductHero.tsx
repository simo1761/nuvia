'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductImage from '@/components/shared/ProductImage';
import StarRating from '@/components/shared/StarRating';
import OrderButton from '@/components/shared/OrderButton';
import { formatPrice } from '@/lib/utils';

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="py-10 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Image gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-alt border border-accent/40 mb-3">
              <ProductImage
                src={product.images[activeImg] || product.images[0]}
                alt={product.name}
                productName={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                wrapperClassName="absolute inset-0"
              />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-gold">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImg ? 'border-primary shadow-gold' : 'border-accent/40 hover:border-primary/50'
                    }`}
                  >
                    <ProductImage src={img} alt={`صورة ${i + 1}`} productName={product.name} fill className="object-cover" sizes="64px" wrapperClassName="absolute inset-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">{product.name}</h1>
            <p className="text-nuvia-light text-lg mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} size="md" />
              <span className="font-semibold text-secondary">{product.rating}</span>
              <span className="text-nuvia-light text-sm">({product.reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>

            {/* Short benefits */}
            <ul className="space-y-2 mb-8">
              {product.benefits.slice(0, 4).map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-nuvia-text">
                  <span className="text-nuvia-success mt-0.5 flex-shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <OrderButton label="اطلبي الآن ✨" size="lg" fullWidth />

            {/* Mini trust badges */}
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="flex items-center gap-1.5 text-xs text-nuvia-light bg-bg-alt px-3 py-1.5 rounded-full">
                🚚 شحن مجاني
              </span>
              <span className="flex items-center gap-1.5 text-xs text-nuvia-light bg-bg-alt px-3 py-1.5 rounded-full">
                💵 دفع عند الاستلام
              </span>
              <span className="flex items-center gap-1.5 text-xs text-nuvia-light bg-bg-alt px-3 py-1.5 rounded-full">
                🔒 أمان تام
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
