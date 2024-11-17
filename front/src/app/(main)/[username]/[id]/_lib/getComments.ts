import { Comment } from "@/model/Comment";
import { QueryFunction } from "@tanstack/react-query";

export const getComments:QueryFunction<Comment[], [_1: string, _2: string]>
= async ({queryKey}) => {
  const [_1, id] = queryKey;
  const res = await fetch(`/comment/getComments?photoId=${id}`, {
    next: {
      tags: ['comments', id],
    },
    cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}