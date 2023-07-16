/** @type {import('next').NextConfig} */
const path = require('path')
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
        destination: `http://${process.env.NEXT_PUBLIC_DEV_HOST}/:path*`,
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.resolve.extensions.push(".tsx", ".ts", ".js", ".json");
    

    return config;
  },

  images: {
    domains: ["lh3.googleusercontent.com", 'avatars.githubusercontent.com', 'graph.facebook.com'],
  },
};

module.exports = nextConfig;
