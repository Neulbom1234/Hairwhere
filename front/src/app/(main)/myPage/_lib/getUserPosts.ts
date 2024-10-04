import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";

type Props = { pageParam?: number };

export const getUserPosts: QueryFunction<Post[], [_1: string, _2: string, _3: string], number>
  = async ({queryKey, pageParam}) => {
    const [_1, _2, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/:userId/posts?page=${pageParam}&size=15`, {
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