/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
