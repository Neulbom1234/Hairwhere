import { PageInfo } from "@/model/PageInfo";
import { QueryFunction } from "@tanstack/react-query";

type Props = {
  pageParam?: number
}

export const getSalonPosts: QueryFunction<PageInfo, [_1: string, _2: string, _3: string], number>
  = async ({queryKey, pageParam}) => {
    const [_1, salonName, salonAddress] = queryKey;
    const res = await fetch(`/photo/find/address/${salonAddress}/?page=${pageParam}&size=15`, {
      next: {
        tags: ['salon', salonName, salonAddress],
      },
      cache: 'no-store',
    });

    if(!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }