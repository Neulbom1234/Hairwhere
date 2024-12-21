"use client"

import { Avatar } from 'antd';
import style from './comment.module.css';
import { Comment as IComment } from '@/model/Comment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from '@tanstack/react-query';

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
  comment: IComment
  id: string
}

export default function Comment({comment, id}: Props) {
  const {setRecomment, setPhotoId } = useStore((state) => ({
    setRecomment: state.setRecomment,
    setPhotoId: state.setPhotoId
  }));
  const queryClient = useQueryClient();
  const { data: me } = useSession(); 
  const router = useRouter();

  const redirectToRecomment = (comment: IComment) => {
    setRecomment(comment);
    setPhotoId(id);
    router.push('/recomment');
  }

  const deleteComment = useMutation({
    mutationFn: () => {
      return fetch(`/comment/deleteComment/${comment.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "comments" && queryKey[1] === id) {
          const value: IComment[] | undefined = queryClient.getQueryData(queryKey);
          const shallow = value ? [...value] : [];
          shallow.filter((c) => c.id !== comment.id);
          queryClient.setQueryData(queryKey, shallow);
        }
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['comments', id]});
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    }
  })

  const deleteRecomment = useMutation({
    mutationFn: () => {
      return fetch(`/comment/deleteComment/${comment.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "recomment" && queryKey[1] === id && queryKey[2] === comment.parentId) {
          const value: IComment[] | undefined = queryClient.getQueryData(queryKey);
          const shallow = value ? [...value] : [];
          console.log(shallow);
          shallow.filter((c) => c.id !== comment.id);
          console.log(shallow);
          queryClient.setQueryData(queryKey, shallow);
        }
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['recomment', id, comment.parentId]});
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    }
  })

  const onDeleteComment = () => {
    // if(window.location.pathname === "/recomment") {
    //   deleteRecomment.mutate();
    // } else {
    //   deleteComment.mutate();
    // }
    deleteComment.mutate();
  }

  return (
    <>
      <div className={style.comment}>
        <Avatar src={comment.user.profilePath} className={style.profile} size={42}/>
        <div className={style.textWrapper}>
          <div className={style.userName}>{comment.user.name}</div>
          <div className={style.text}>{comment.content}</div>
          <div className={style.commentBottom}>
            <span className={style.time}>{dayjs(comment.createdAt).fromNow(true)} 전</span>
            <span className={style.recomment} onClick={()=>redirectToRecomment(comment)}>
              {comment.parentId ?
                <></>
                : comment.replies.length === 0 ?
                  "답글 달기"
                  : `답글 ${comment.replies.length}개 보기`
              }
            </span>
            <span className={style.delete} onClick={() => onDeleteComment()}>
              {comment.user.name === me?.user?.name ?
                "삭제하기":
                <></>}
            </span>
          </div>
        </div>
      </div>
    </> 
    )
    
}