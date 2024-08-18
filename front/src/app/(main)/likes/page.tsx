"use client"

import style from './likes.module.css';
import {useRouter} from "next/navigation";
import { useSession } from 'next-auth/react';
import LikePosts from './_component/LikePosts';

export default function Page() {
  const {data: me} = useSession();
  const router = useRouter()
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  return (
    <>
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.like}>좋아하는 게시글</div>
        </div>
        <div className={style.likeWrapper}>
          <LikePosts userId={me?.user?.email}/>
        </div>
      </div>
    </>
  )
}