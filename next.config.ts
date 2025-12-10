/** @type {import('next').NextConfig} */
process.env.NEXT_PRIVATE_BUILD_WEBPACK = "1";

const nextConfig = {
	experimental: {
		webpackBuildWorker: true,
	},
};

module.exports = nextConfig;
