"use client";

import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(main)/searchResult/_lib/getSearchResult";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PageInfo } from "@/model/PageInfo";

type Props = {
  searchParams: { 
    hairName: string;
    gender: string;
    hairLength: string;
    hairColor: string;
  };
}

export default function SearchResult({ searchParams }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage, 
    isFetching, 
  } = useSuspenseInfiniteQuery<PageInfo, Object, InfiniteData<PageInfo>, [_1: string, _2: string, { hairName: string, gender: string, hairLength: string, hairColor: string }], number>({
    //getSearchResult가 IPost[]을 반환, Object(searchParams)를 받음, 캐시 데이터의 타입, queryKey의 타입
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (Array.isArray(lastPage)) {
        return lastPage.at(-1)?.content[-1].id;
      }
      return undefined; // 배열이 아닐 경우 안전하게 undefined 반환
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
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

  console.log(data);

  return (
    <>
      {data?.pages?.map((page, idx) => (
        <Fragment key={idx}>
        {page?.content?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Fragment>))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
