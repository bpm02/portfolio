/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // .env.localやVercelから取得
        API_URL: process.env.API_URL,
        MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
        BASIC_AUTH_NAME: process.env.BASIC_AUTH_NAME,
        BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.microcms-assets.io',
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
