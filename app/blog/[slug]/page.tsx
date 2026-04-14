import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { products } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | نوفيا كلينيك`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = post.relatedProductSlugs
    ? products.filter((p) => post.relatedProductSlugs!.includes(p.slug))
    : [];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1 text-primary text-sm hover:underline mb-6">
          <span>→</span> العودة للمدونة
        </Link>

        {/* Header */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl flex items-center justify-center mb-8">
          <span className="text-6xl">📝</span>
        </div>

        <p className="text-sm text-nuvia-light mb-3">{formatDate(post.date)}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">{post.title}</h1>

        {/* Content */}
        <div
          className="prose prose-sm max-w-none text-nuvia-text leading-relaxed space-y-4"
          style={{ direction: 'rtl' }}
        >
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-bold text-secondary mt-6 mb-3">
                  {para.replace('## ', '')}
                </h2>
              );
            }
            if (para.startsWith('**')) {
              return (
                <p key={i} className="font-bold text-secondary">
                  {para.replace(/\*\*/g, '')}
                </p>
              );
            }
            if (para.trim() === '') return null;
            return (
              <p key={i} className="text-sm leading-relaxed">
                {para.trim()}
              </p>
            );
          })}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-secondary mb-5">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
