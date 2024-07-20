"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') { //브라우저에서만 실행된다는 것을 보장
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser"); //클라이언트 환경에서 mockServiceWorker가 요청을 가로챔 -> http.ts로 보냄 -> handlers.ts가 실행
      }
    }
  }, []);

  return null;
};