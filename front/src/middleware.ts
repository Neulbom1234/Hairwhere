import { auth } from "./auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    // 세션 검증
    const session = await auth();
    
    // 세션이 없으면 로그인 페이지로 리다이렉트
    if (!session) {
      console.log('No active session for protected route');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: ['/post', '/likes', '/notice', '/myPage'],
}
