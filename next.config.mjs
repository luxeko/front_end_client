import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ['eslint'],
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    poweredByHeader: true,
    compress: true,
    devIndicators: {
        buildActivityPosition: 'bottom-right',
        buildActivity: false,
    },
    productionBrowserSourceMaps: true,
    generateEtags: false,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    swcMinify: true,
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
            'lodash',
            'react-icons/*',
            'lottie-web',
            '@radix-ui/*',
        ],
    },
    compiler: {
        styledComponents: true,
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/products',
    //             destination: '/products?page_size=12&page_index=1&search=&category_id=&price_from=0&price_to=10000000&sort=created_at-desc',
    //             permanent: false,
    //         },
    //     ];
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/products',
    //             destination: '/products?page_size=12&page_index=1&search=&category_id=&price_from=0&price_to=10000000&sort=created_at-desc',
    //         },
    //     ];
    // },
    env: {
        CLIENT_URL: process.env.CLIENT_URL,
        VERCEL_URL: process.env.VERCEL_URL,
        SERVER_URL: process.env.SERVER_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img-b.udemycdn.com",
                port: "",
                pathname: "/course/**",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "4002",
                pathname: "/images/**",
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default withNextIntl(nextConfig);