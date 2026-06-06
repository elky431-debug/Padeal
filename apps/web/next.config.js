/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@padeal/ui', '@padeal/lib', '@padeal/types', '@padeal/config'],
  images: {
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
