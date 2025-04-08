/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bypass TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Optional: bypass ESLint too
  },
};

export default nextConfig;
