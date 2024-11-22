/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        post: '3000',
      },
    ],
  },
  images: {
    domains: ['ftp.goit.study'],
  },
};

export default nextConfig;
