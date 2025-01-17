import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }, // tắt caching
};

export default withNextIntl(nextConfig);
