"use client";

import { InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {getUserPosts} from "../_lib/getUserPosts";
import Post from "../../_component/Post";
import { PageInfo } from "@/model/PageInfo";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import style from './userInfo.module.css';

type Props = {
  username: string,
}

export default function UserPosts({username}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage, 
    isFetching,
  } = useInfiniteQuery<PageInfo, Object, InfiniteData<PageInfo>, [_1: string, _2: string, _3: string], number>({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    initialPageParam:0,
    getNextPageParam: (lastPage) => {
      if (Array.isArray(lastPage)) {
        return lastPage.at(-1)?.content[-1].id;
      }
      return undefined; // 배열이 아닐 경우 안전하게 undefined 반환
    },
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
      {data?.pages[0].content.length === 0 
        ? (<div className={style.nonePostsWrapper}>
            <svg aria-label="카메라"  fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62">
              <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></circle>
              <ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" stroke-linejoin="round" stroke-width="2.095"></ellipse>
              <path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            <span>게시물 없음</span>
          </div>)
        : (
          <>
            {data?.pages?.map((page, idx) => (
              <Fragment key={idx}>
                {page?.content?.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </Fragment>))}
            <div ref={ref} style={{height: 50}}/>
          </>
          )
      }
    </>
  );
}