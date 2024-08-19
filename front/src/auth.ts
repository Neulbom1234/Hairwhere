import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from 'cookie';
import { cookies } from 'next/headers'

export const {
  handlers: { GET, POST }, //route.ts
  auth,
  signIn,
} = NextAuth({
  pages: { //로그인 페이지 등록
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [  //로그인 하는 코드
    CredentialsProvider({
      async authorize(credentials) { //credentials는 로그인 창에 입력된 정보들(id, password)
        const authResponse = await fetch(`${process.env.BACKEND_API_SERVER}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ //credential 안에 username과 password라는 이름으로 고정되어 있다
            loginId: credentials.username,
            pw: credentials.password,
          }),
        })
        let setCookie = authResponse.headers.get('Set-Cookie');
        console.log('set-cookie', setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
        }
        if (!authResponse.ok) { //로그인 실패
          return null
        }

        const user = await authResponse.json() //로그인 성공(user 정보 전달)
        console.log('user', user);
        return { //auth에서는 email, name, image만 지원하기에 불러온 user정보들의 이름을 바꿔준다.
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ]
});