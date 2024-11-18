import { Comment } from "@/model/Comment";
import { QueryFunction } from "@tanstack/react-query";

export const getRecomments: QueryFunction<Comment[], [_1: string, _2: string, _3: string]>
= async ({queryKey}) => {
  const [_1, photoId, id] = queryKey;
  const res = await fetch(`/comment/getComments/${photoId}?parentId=${id}`, {
    next: {
      tags: ['recomment', photoId, id],
    },
    cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}