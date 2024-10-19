/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
      outputFileTracingRoot: __dirname,
    },
    reactStrictMode: true,
  };
  
  module.exports = nextConfig;  