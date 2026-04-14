'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  productName?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
}

// Color themes per product type derived from slug/alt keywords
function getTheme(name: string): { from: string; to: string; icon: string } {
  const n = name.toLowerCase();
  if (n.includes('kit') || n.includes('كيت'))
    return { from: '#F7F3ED', to: '#E8D5B7', icon: '✨' };
  if (n.includes('oil') || n.includes('زيت'))
    return { from: '#FFF8F0', to: '#FCE8C8', icon: '💧' };
  if (n.includes('brush') || n.includes('فرشاة'))
    return { from: '#F4F8F7', to: '#E0F0ED', icon: '🌿' };
  if (n.includes('program') || n.includes('برنامج'))
    return { from: '#F0EDF8', to: '#E2DDF0', icon: '🎁' };
  return { from: '#F7F3ED', to: '#E8D5B7', icon: '✨' };
}

export default function ProductImage({
  src,
  alt,
  productName,
  fill = false,
  sizes,
  priority = false,
  className = '',
  wrapperClassName = '',
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const theme = getTheme(productName || alt);
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 select-none ${wrapperClassName}`}
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      >
        <span className="text-4xl leading-none">{theme.icon}</span>
        <span
          className="text-xs font-semibold text-center px-3 leading-tight"
          style={{ color: '#B08D4F' }}
        >
          {productName || 'نوفيا كلينيك'}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      width={600}
      height={600}
      onError={() => setHasError(true)}
    />
  );
}
