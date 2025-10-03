/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Comentado para usar Netlify Functions
  // trailingSlash: true, // Comentado para usar Netlify Functions
  // experimental: {
  //   optimizeCss: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Deshabilitar optimización de imágenes para evitar problemas en deploy
  },
  // Video optimization
  async headers() {
    return [
      {
        source: '/rami-video.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/video-poster.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Compression
  compress: true,
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig