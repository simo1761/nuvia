/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,

  async headers() {
    return [
      // Long-lived cache for public static assets (images, videos)
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/product/pack-rf', destination: '/', permanent: true },
      { source: '/products', destination: '/', permanent: true },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 2592000,
    deviceSizes: [390, 430, 640, 768, 1080, 1280],
    imageSizes: [64, 128, 208, 256, 320, 420],
  },
};

module.exports = nextConfig;
