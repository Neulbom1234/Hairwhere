import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from 'cookie';

export const {
  handlers: { GET, POST }, // route.ts
  auth,
  signIn,
} = NextAuth({
  pages: { // 로그인 페이지 등록
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [  // 로그인 하는 코드
    CredentialsProvider({
      async authorize(credentials) { // credentials는 로그인 창에 입력된 정보들 (id, password)
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginId: credentials.username,
            pw: credentials.password,
          }),
          credentials: 'include',  // 세션 쿠키 포함
        });

        console.log('authResponse status:', authResponse.status);
        for (const [key, value] of authResponse.headers.entries()) {
          console.log(`로그인 후 받는 값: ${key}: ${value}`);
        }

        let setCookie = authResponse.headers.get('set-cookie');
        console.log('set-cookie', setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set('JSESSIONID', parsed['JSESSIONID'], {
            ...parsed,
            maxAge: 1800, //30분
            path: '/'
          }); // 브라우저에 쿠키를 심어주는 것
        }

        if (!authResponse.ok) { 
          console.error('Login failed:', authResponse.statusText);
          return null;
        }

        const user = await authResponse.json(); // 로그인 성공 (user 정보 전달)
        console.log('user', user);

        return { // auth에서는 email, name, image만 지원하므로 user 정보들의 이름을 바꿔서 반환
          id: user.loginId,
          email: user.email,
          name: user.name,
          image: user.profilePath,
          ...user,
        };
      },
    }),
  ],
  session: {
    maxAge: 60 * 60, // 세션 유효 시간: 1시간
  }
});
