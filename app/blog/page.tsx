import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import { formatDate } from '@/lib/utils';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata: Metadata = {
  title: 'المدونة | نوفيا كلينيك',
  description: 'مقالات ونصائح حول العناية بالبشرة وعلاج السيلوليت',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="المدونة"
          subtitle="نصائح ومعلومات حول العناية بالبشرة وعلاج السيلوليت"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-accent/40 shadow-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary-dark/20 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-nuvia-light mb-2">{formatDate(post.date)}</p>
                <h2 className="font-bold text-secondary mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-nuvia-light text-xs line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3">
                  اقرئي المزيد
                  <span className="text-base">←</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
