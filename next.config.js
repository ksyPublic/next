/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  /** 서버 실행시 경로 설정
   */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
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

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
