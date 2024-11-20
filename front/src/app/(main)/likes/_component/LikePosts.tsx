"use client"

import { PageInfo } from "@/model/PageInfo";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { getLikePosts } from "../_lib/getLikePosts"
import Post from "../../_component/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
    userName: string;
}

export default function LikePosts({userName}: Props) {
    const {
        data,
        fetchNextPage,
        hasNextPage, 
        isFetching,
    } = useSuspenseInfiniteQuery<PageInfo, Object, InfiniteData<PageInfo>, [_1: string, _2: string, _3: string], number>({
        queryKey:["posts","likes",userName],
        queryFn:getLikePosts,
        initialPageParam:0,
        getNextPageParam: (lastPage) => {
          if (Array.isArray(lastPage)) {
            return lastPage.at(-1)?.content[-1].id;
          }
          return undefined; // 배열이 아닐 경우 안전하게 undefined 반환
        },
        staleTime:60 * 1000,
        gcTime:300 * 1000,
    })

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });
    
      useEffect(() => {
        if (inView) {
          !isFetching && hasNextPage && fetchNextPage();
        }
      }, [inView, isFetching, hasNextPage, fetchNextPage]);

      return (
        <>
          {data?.pages?.map((page, idx) => (
            <Fragment key={idx}>
              {page?.content?.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </Fragment>))}
          <div ref={ref} style={{height: 50}}/>
        </>
      );
    }