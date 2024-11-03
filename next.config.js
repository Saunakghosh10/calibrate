/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    return config;
  },
}

module.exports = nextConfig 