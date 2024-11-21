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
  reactStrictMode: false,
  images: {
    domains: ['ftp.goit.study'],
  },
};

export default nextConfig;
/*

sm	640px	@media (min-width: 640px) { ... }

md	768px	@media (min-width: 768px) { ... }

lg	1024px	@media (min-width: 1024px) { ... }

xl	1280px	@media (min-width: 1280px) { ... }

2xl 1536px	@media (min-width: 1536px) { ... }



*/
