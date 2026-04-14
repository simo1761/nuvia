'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import StarRating from './StarRating';
import ProductImage from './ProductImage';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 border border-accent/40"
    >
      {/* Image */}
      <div className="relative aspect-square bg-bg-alt overflow-hidden">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          productName={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          wrapperClassName="absolute inset-0"
        />
        {product.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold px-3 py-1 rounded-full shadow-gold">
            {product.badge}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">نفذ المخزون</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-secondary text-sm sm:text-base mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-nuvia-light text-xs mb-2 line-clamp-2">{product.tagline}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-nuvia-light">({product.reviewCount})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-gold group-hover:shadow-gold-lg transition-all">
            اطلبي الآن
          </span>
        </div>
      </div>
    </Link>
  );
}
