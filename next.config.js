/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
  webpack: (config, options) => {
    config.resolve.extensions.push(".tsx", ".ts", ".js", ".json");

    return config;
  },
};

module.exports = nextConfig;
