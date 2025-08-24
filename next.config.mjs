/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
