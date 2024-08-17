"use client";

import { InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {getUserPosts} from "../_lib/getUserPosts";
import Post from "../../_component/Post";
import {Post as IPost} from "@/model/Post";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

type Props = {
  username: string,
}

export default function UserPosts({username}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage, 
    isFetching,
  } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string, _3: string], number>({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    initialPageParam:0,
    getNextPageParam: (lastPage)=>lastPage.at(-1)?.id,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
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


  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['users', username]);

  return (
    <>
      {data?.pages?.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Fragment>))}
        <div ref={ref} style={{height: 50}}/>
    </>
  );
}