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
  callbacks: {
    jwt({ token}) {
      console.log('auth.ts jwt', token);
      return token;
    },
    session({ session, newSession, user}) {
      console.log('auth.ts session', session, newSession, user);
      return session;
    }
  },
  providers: [  // 로그인 하는 코드
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginId: credentials.username,
            pw: credentials.password,
          }),
        });
      
        console.log('authResponse status:', authResponse.status);
        for (const [key, value] of authResponse.headers.entries()) {
          console.log(`로그인 후 받는 값: ${key}: ${value}`);
        }
        console.log('이게 값', authResponse);
      
        let setCookie = authResponse.headers.get('set-cookie');
        console.log('set-cookie', setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set('JSESSIONID', parsed['JSESSIONID'], {
            ...parsed,
            maxAge: 1800, //30분
            path: '/'
          });
        }
      
        if (!authResponse.ok) {
          console.error('Login failed:', authResponse.statusText);
          return null;
        }
      
        // 응답 텍스트 출력 및 JSON 파싱 시도
        const responseText = await authResponse.text();
        console.log('Response Text:', responseText);
      
        let user;
        try {
          user = JSON.parse(responseText);
          console.log('Parsed user object:', user);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
          return null;
        }
      
        // 필수 속성 확인
        if (!user.loginId || !user.email || !user.name || !user.profilePath) {
          console.error('User object is missing required properties:', user);
          return null;
        }
      
        console.log('User object looks good:', user);
      
        return {
          id: user.loginId,
          email: user.email,
          name: user.name,
          image: user.profilePath,
          ...user,
        };
      }
      
    }),
  ],
});
