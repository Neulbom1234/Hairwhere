"use client"

import style from './likes.module.css';
import Link from 'next/link'
import {useState} from "react";
import {useRouter} from "next/navigation";
import {faker} from '@faker-js/faker';
import Post from "../_component/Post"


export default function Page() {
  const router = useRouter()
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  const target = {
    postId: 1,
    User: {
      id: 'elonmusk',
      nickname: 'Elon Musk',
    },
    content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
    createdAt: new Date(),
    Images: [] as any[],
  }

 


  return (
    <>
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.like}>좋아하는 게시글</div>
        </div>

        <div className={style.likeWrapper}>
          <Post/> 
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
      </div>
    </>
  )
}