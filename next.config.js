/** @type {import('next').NextConfig} */
const host =
	process.env.NODE_ENV === 'development'
		? `http://${process.env.NEXT_PUBLIC_DEV_HOST}`
		: `https://${process.env.NEXT_PUBLIC_PRODUCTION_NAME}`;
const nextConfig = {
	swcMinify: true,
	reactStrictMode: false,
	experimental: {
		appDir: true,
		esmExternals: false,
	},

	/** 서버 실행시 경로 설정
	 */
	async redirects() {
		return [
			{
				source: '/',
				destination: '/main',
				permanent: true,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${host}/:path*`,
			},
		];
	},

	webpack: (config, { isServer }) => {
		config.resolve.extensions.push('.tsx', '.ts', '.js', '.json');

		return config;
	},

	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'graph.facebook.com',
			'yts.mx',
			'firebasestorage.googleapis.com',
		],
	},
};

module.exports = nextConfig;
