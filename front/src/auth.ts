import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ //credential 안에 username과 password라는 이름으로 고정되어 있다
            id: credentials.username,
            password: credentials.password,
          }),
        })

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