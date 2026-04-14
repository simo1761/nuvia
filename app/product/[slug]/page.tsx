import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { products } from '@/data/products';
import ProductHero from '@/components/product/ProductHero';
import OrderButton from '@/components/shared/OrderButton';

// Below-the-fold — code-split to cut main-thread JS work
const ProductStories    = dynamic(() => import('@/components/product/ProductStories'),    { ssr: false, loading: () => null });
const ProductBenefits   = dynamic(() => import('@/components/product/ProductBenefits'));
const ProductHowToUse   = dynamic(() => import('@/components/product/ProductHowToUse'),   { ssr: false, loading: () => null });
const ProductBeforeAfter= dynamic(() => import('@/components/product/ProductBeforeAfter'),{ ssr: false, loading: () => null });
const ProductReviews    = dynamic(() => import('@/components/product/ProductReviews'),    { ssr: false, loading: () => null });
const ProductFAQ        = dynamic(() => import('@/components/product/ProductFAQ'));
const OtherProducts     = dynamic(() => import('@/components/product/OtherProducts'),    { ssr: false, loading: () => null });
const CheckoutForm      = dynamic(() => import('@/components/product/CheckoutForm'),     { ssr: false, loading: () => null });

const ANTI_CELLULITE_SLUG = 'anti-cellulite-kit';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | نوفيا كلينيك`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) notFound();

  const isAntiCellulite = product.slug === ANTI_CELLULITE_SLUG;

  return (
    <>
      <ProductHero product={product} />

      {/* Stories — only for anti-cellulite kit */}
      {isAntiCellulite && <ProductStories />}

      {/* Floating CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-white border-t border-accent/40 shadow-lg">
        <OrderButton
          label={`اطلبي الآن — ${product.price} ${product.currency}`}
          size="md"
          fullWidth
        />
      </div>

      <ProductBenefits product={product} />
      {isAntiCellulite && <ProductHowToUse />}
      <ProductBeforeAfter />
      <ProductReviews product={product} showPhotoReviews={isAntiCellulite} />
      <ProductFAQ />
      <OtherProducts currentSlug={product.slug} />
      <CheckoutForm product={product} />

      {/* Extra padding for mobile floating bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
