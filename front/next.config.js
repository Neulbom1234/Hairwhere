/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/photo/:path*',
        destination: 'http://3.35.146.40:8080/photo/:path*', // 프록시로 보낼 API 주소
      },
    ];
  },
};

module.exports = nextConfig;
