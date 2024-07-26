"use client";

import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import {getSearchResult} from "@/app/(main)/searchResult/_lib/getSearchResult";
import { useQuery } from "@tanstack/react-query";

type Props = {
  searchParams: { q: string, f?: string, pf?: string };
}
export default function SearchResult({ searchParams }: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, Props['searchParams']]>({
    //getSearchResult가 IPost[]을 반환, Object(searchParams)를 받음, 캐시 데이터의 타입, queryKey의 타입
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ))
}