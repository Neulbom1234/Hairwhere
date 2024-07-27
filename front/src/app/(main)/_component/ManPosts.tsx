"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { getManPosts } from "../_lib/getManPosts";
import Post from "./Post";
import type { Post as IPost } from "@/model/Post";

export default function ManPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'mans'], 
    queryFn: getManPosts,
    staleTime: 60 * 1000, //fresh -> stale로 바뀌는 시간, gcTime보다 작아야함
    gcTime: 300 * 1000, //캐싱한 데이터가 없어지는 시간
    
  });

  return data?.map((post) => (
    <Post key={post.postId} post={post}/>
  ))
}