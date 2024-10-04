import { QueryFunction } from "@tanstack/react-query";
import { PageInfo } from "@/model/PageInfo";

type Props = { pageParam?: number };

export const getUserPosts: QueryFunction<PageInfo, [_1: string, _2: string, _3: string], number>
  = async ({queryKey, pageParam}) => {
    const [_1, _2, username] = queryKey;
    console.log(`username입니당: ${username}`);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/find/${username}/photos?page=${pageParam}&size=15`, {
      next: {
        tags: ['posts', 'users', username],
      },
      cache: 'no-store',
    });

    if(!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }