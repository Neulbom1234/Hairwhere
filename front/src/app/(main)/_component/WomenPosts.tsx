"use client"

import { InfiniteData, useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getWomenPosts } from "../_lib/getWomenPosts";
import Post from "./Post";
import type { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function WomenPosts() {
  const { 
    data,
    fetchNextPage,
    hasNextPage, 
    isFetching,  
  } = useSuspenseInfiniteQuery<IPost[],Object,InfiniteData<IPost[]>,[_1: string, _2: string],number>({
    queryKey: ['posts', 'womens'], 
    queryFn: getWomenPosts,
    initialPageParam:0,
    getNextPageParam: (lastPage)=>lastPage.at(-1)?.id,
    staleTime: 60 * 1000, //fresh -> stale로 바뀌는 시간, gcTime보다 작아야함
    gcTime: 300 * 1000, //캐싱한 데이터가 없어지는 시간
    
  });


  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  console.log(data)

  return (
    <>
      {data?.pages?.map((page, idx) => (
        <Fragment key={idx}>
          {page?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Fragment>))}
        <div ref={ref} style={{height: 50}}/>
    </>
  );
}