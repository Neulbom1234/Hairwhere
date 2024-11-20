import { QueryFunction } from "@tanstack/react-query";
import { PageInfo } from "@/model/PageInfo";

type Props = { pageParam?: number };

export const getLikePosts: QueryFunction<PageInfo, [_1: string, _2: string, _3: string], number>
  = async ({queryKey, pageParam}) => {
    const [_1, _2, userName] = queryKey;
    const res = await fetch(`/mypage/like/?page=${pageParam}&size=15`, {
      next: {
        tags: ['posts', 'likes', userName],
      },
      cache: 'no-store',
    });

    if(!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

