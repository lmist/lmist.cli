// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true, // Recommended for catching common issues
    swcMinify: true,       // Faster builds with SWC minification
};

export default nextConfig

