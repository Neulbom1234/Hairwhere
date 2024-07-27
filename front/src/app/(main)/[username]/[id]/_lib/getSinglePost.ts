import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/model/Post";

export const getSinglePost: QueryFunction<Post, [_1: string, _2: string]>
 = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ['postst', id],
    },
  });

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
 }