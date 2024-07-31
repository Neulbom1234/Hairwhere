"use client";

import { useQuery } from "@tanstack/react-query";
import { Post as IPost} from "@/model/Post";
import Post from "@/app/(main)/_component/Post";
import { getSalonPosts } from "../_lib/getSalonPosts";

type Props = {
  salonName: string;
}

export default function SalonPosts({salonName}: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string]>({
    queryKey: ['salon', salonName],
    queryFn: getSalonPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ))
}