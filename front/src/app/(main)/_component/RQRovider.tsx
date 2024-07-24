"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({children}: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {  // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, //탭 전환
          retryOnMount: true, // 마운트 됐을 때
          refetchOnReconnect: false, // 인테넷 접속이 끊겼다가 다시 연결 됐을 때
          retry: false, // 데이터를 가져오는 중 오류가 생겼을 때
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children} {/*children들은 react query를 공유 */}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local' }/> {/* 개발모드에서만 devTools 사용하는 옵션 */}
    </QueryClientProvider>
  );
}

export default RQProvider;