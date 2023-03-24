/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },

  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
