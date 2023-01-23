/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
