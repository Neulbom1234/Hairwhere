"use client";

import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(main)/searchResult/_lib/getSearchResult";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  searchParams: { q: string};
}

export default function SearchResult({ searchParams }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage, 
    isFetching, 
  } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string, { q: string }], number>({
    //getSearchResult가 IPost[]을 반환, Object(searchParams)를 받음, 캐시 데이터의 타입, queryKey의 타입
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
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
          {page?.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
