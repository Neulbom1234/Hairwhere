import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";

type Props = { pageParam?: number };

export const getSearchResult: QueryFunction<Post[], [_1: string, _2: string, { q: string }], number> 
= async ({ queryKey, pageParam }) => {
  const [_1, _2, searchParams] = queryKey; // queryKey에서 searchParams 추출
  const urlParams = new URLSearchParams(searchParams as Record<string, string>).toString(); // URLSearchParams 사용하여 query string 생성
  const cursor = pageParam ? `&cursor=${pageParam}` : ''; // pageParam이 존재할 경우 cursor 추가
  const res = await fetch(`http://localhost:9090/api/search/${searchParams.q}?${urlParams}${cursor}`, {
    next: {
      tags: ['posts', 'search', searchParams.q],
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
