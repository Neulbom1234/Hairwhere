import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
  const session = await auth(); //세션이 없으면 로그인 페이지로 이동하게
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/login');
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/post', '/likes', '/notice', '/username'], //로그인 하기 전 접근 못하는 페이지들
}