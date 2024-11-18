"use client"

import { Avatar } from 'antd';
import style from './comment.module.css';
import { Comment as IComment } from '@/model/Comment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useStore } from '@/store/store';
import { useRouter } from 'next/navigation';

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
  comment: IComment
  id: string
}

export default function Comment({comment, id}: Props) {
  const { recomment, setRecomment, photoId, setPhotoId } = useStore((state) => ({
    recomment: state.recomment,
    setRecomment: state.setRecomment,
    photoId: state.photoId,
    setPhotoId: state.setPhotoId
  }));
  const router = useRouter();

  const redirectToRecomment = (comment: IComment) => {
    setRecomment(comment);
    setPhotoId(id);
    router.push('/recomment');
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
              {comment.replies.length === 0 ?
                "답글 달기"
                : `답글 ${comment.replies.length}개 보기`
              }
            </span>
          </div>
        </div>
      </div>
    </> 
    )
    
}