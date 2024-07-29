
import { Post as IPost } from "@/model/Post";

import { useQuery } from "@tanstack/react-query"
import { getLikePosts } from "../_lib/getLikePosts"
import Post from "../../_component/Post";

type Props = {
    userId: any;
}

export default function LikePosts({userId}: Props) {
    const {data} = useQuery<IPost[], Object, IPost[], [_1:string, _2:string, _3:string]>({
        queryKey:["posts","likes",userId],
        queryFn:getLikePosts,
        staleTime:60*1000,
        gcTime:300*1000,
    })

    return data?.map((post) => (
      <Post key={post.postId} post={post} />
    ))
}