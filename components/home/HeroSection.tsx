import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/shared/StarRating';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-[#2a1a3e] text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              منتج طبي معتمد ومجرّب
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              بشرة{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
                ناعمة
              </span>
              <br />
              بدون سيلوليت
            </h1>

            <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-lg lg:max-w-none">
              روتينك اليومي لجسم مثالي — نتائج مرئية خلال 30 يوم
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarRating rating={4.8} size="md" />
                </div>
                <span className="text-white/90 font-semibold">4.8/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">+10,000</span>
                <span className="text-white/80">عميلة سعيدة</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-0.5 order-btn-pulse"
              >
                تسوقي الآن ✨
              </Link>
              <Link
                href="/product/anti-cellulite-kit"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all duration-300"
              >
                اكتشفي المنتج الأكثر مبيعاً
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <span>🚚</span> شحن مجاني
              </span>
              <span className="flex items-center gap-1.5">
                <span>💵</span> دفع عند الاستلام
              </span>
              <span className="flex items-center gap-1.5">
                <span>↩️</span> ضمان الرضا
              </span>
            </div>
          </div>

          {/* Hero product image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-[380px] lg:w-[460px]" style={{ aspectRatio: '1 / 1' }}>

              {/* Outer glow ring — slow spin (transform = composited) */}
              <div
                className="absolute inset-0 rounded-full border border-primary/20 animate-spin"
                style={{ animationDuration: '24s', willChange: 'transform' }}
              />
              <div
                className="absolute inset-6 rounded-full border border-primary/10 animate-spin"
                style={{ animationDuration: '18s', animationDirection: 'reverse', willChange: 'transform' }}
              />

              {/* Gold radial glow behind product */}
              <div
                className="absolute inset-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 50% 60%, rgba(201,169,110,0.28) 0%, rgba(176,141,79,0.14) 50%, transparent 75%)',
                  filter: 'blur(18px)',
                }}
              />

              {/* Warm ambient light top-left */}
              <div
                className="absolute -top-6 -left-6 w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(232,213,183,0.18) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />

              {/* Product image — transparent PNG, drop-shadow for premium feel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/hero-pack.png"
                  alt="باقة نوفيا المضادة للسيلوليت"
                  width={420}
                  height={420}
                  priority
                  className="w-full h-full object-contain select-none"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(201,169,110,0.45)) drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
                  }}
                />
              </div>

              {/* Reflection / floor shadow */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/5 h-6 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(201,169,110,0.30) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Floating badge — rating */}
              <div className="absolute top-4 -right-4 sm:-right-6 bg-white text-secondary text-xs font-bold px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-amber-400">★</span> 4.8 / 5
              </div>

              {/* Floating badge — reviews count */}
              <div className="absolute top-16 -right-4 sm:-right-8 bg-secondary/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-2xl shadow-lg whitespace-nowrap">
                +347 تقييم
              </div>

              {/* Floating badge — free shipping */}
              <div
                className="absolute bottom-8 -left-4 sm:-left-8 text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #B08D4F)' }}
              >
                🚚 شحن مجاني
              </div>

              {/* Floating badge — COD */}
              <div className="absolute bottom-0 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-medium px-3 py-1.5 rounded-2xl whitespace-nowrap">
                💵 دفع عند الاستلام
              </div>

              {/* Sparkle dots — static, no JS animation cost */}
              <div className="absolute top-1/3 left-0 w-2 h-2 rounded-full bg-primary/50" />
              <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/35" />
              <div className="absolute bottom-1/3 right-0 w-2 h-2 rounded-full bg-primary/45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
