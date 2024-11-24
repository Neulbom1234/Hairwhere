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
      },
      {
        source: '/mypage/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/mypage/:path*`
      },
      {
        source: '/comment/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/comment/:path*`
      },
      {
        source: '/find/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/find/:path*`
      },
    ];
  }
};

module.exports = nextConfig;
