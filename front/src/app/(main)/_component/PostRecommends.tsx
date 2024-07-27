"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "./Post";
import type { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useSuspenseQuery<IPost[]>({ //인피니트 스크롤링 할 때 useInfiniteQuery말고 useSuspenseInfiniteQuery 쓰기! 이유는 섹션3 마지막 강의 참조하셈
    queryKey: ['posts', 'recommends'], 
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, //fresh -> stale로 바뀌는 시간, gcTime보다 작아야함
    gcTime: 300 * 1000, //캐싱한 데이터가 없어지는 시간
    
  });

  console.log(data)

  return data?.map((post) => (
    <Post key={post.postId} post={post}/>
  ))
}