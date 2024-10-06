/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/photo/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/photo/:path*`, // 프록시로 보낼 API 주소
      },
      {
        source: '/like/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/like/:path*`
      }
    ];
  },
};

module.exports = nextConfig;
