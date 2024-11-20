import { getRecomments } from "@/app/(main)/_lib/getRecomments"
import { Comment as IComment } from "@/model/Comment"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"
import Comment from "../[username]/[id]/_component/Comment"

type Props = {
  photoId: string,
  id: string
}

export default function Recomments({photoId, id}: Props) {
  const { data } = useQuery<IComment[], object, IComment[], [_1: string, _2: string, _3: string]>({
    queryKey: ['recomment', photoId, id],
    queryFn: getRecomments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000
  })

  return (
    <>
      {data?.map((comment, idx) => (
        <Fragment key={idx}>
          <Comment key={comment.id} comment={comment} id={id}/>
        </Fragment>
      ))}
    </>
  )
}