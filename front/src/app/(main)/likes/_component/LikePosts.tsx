import { Post as IPost } from "@/model/Post";

import { InfiniteData, useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { getLikePosts } from "../_lib/getLikePosts"
import Post from "../../_component/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
    userId: any;
}

export default function LikePosts({userId}: Props) {
    const {
        data,
        fetchNextPage,
        hasNextPage, 
        isFetching,
    } = useSuspenseInfiniteQuery<
        IPost[], 
        Object, 
        InfiniteData<IPost[]>, 
        [_1:string, _2:string, _3:string],
        number
    >({
        queryKey:["posts","likes",userId],
        queryFn:getLikePosts,
        initialPageParam:0,
        getNextPageParam: (lastPage)=>lastPage.at(-1)?.postId,
    
        staleTime:60*1000,
        gcTime:300*1000,
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
    
      console.log(data)
    

      return (
        <>
          {data?.pages?.map((page, idx) => (
            <Fragment key={idx}>
              {page?.map((post) => (
                <Post key={post.postId} post={post} />
              ))}
            </Fragment>))}
            <div ref={ref} style={{height: 50}}/>
        </>
      );
    }