import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";
import { PageInfo } from "@/model/PageInfo";

type Props = { 
  pageParam?: number
};

export const getSearchResult: QueryFunction<PageInfo, [_1: string, _2: string, { hairName: string; gender: string; hairLength: string; hairColor: string }], number> 
= async ({ queryKey, pageParam }) => {
  const [_1, _2, searchParams] = queryKey; // queryKey에서 searchParams 추출
  const res = await fetch(`/photo/search/?page=${pageParam}&size=15&hairName=${searchParams.hairName}&gender=${searchParams.gender}&hairLength=${searchParams.hairLength}&hairColor=${searchParams.hairColor}`, {
    next: {
      tags: ['posts', 'search', searchParams.hairName],
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
