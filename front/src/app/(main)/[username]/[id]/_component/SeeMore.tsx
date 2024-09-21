"use client";

import React, { MouseEventHandler, useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import style from './seeMore.module.css';
import { Post } from '@/model/Post';
import { useRouter } from "next/navigation";

type Props = {
  post: Post
}

const items = [
  {
    label: "클립보드 복사",
    key: '0',
  },
  {
    label: "신고하기",
    key: '1',
  },
];

export default function SeeMore({ post }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const loginItems = [
    {
      label: "클립보드 복사",
      key: '0',
    },
    {
      label: (
        <span
          style={{color: '#dc2626'}}
          onClick={() => setIsOpen(true)} // Open dialog on click
        >
          삭제하기
        </span>
      ),
      key: '1',
    },
  ];

  useEffect(() => {
    console.log(`값이다: ${isOpen}`)
  }, [isOpen])

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/photo/delete/${post.id}`, {
        method: 'delete',
        credentials: 'include',
      });

      if(!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response;
    },
    async onSuccess() {
      router.push('/');
      setTimeout(() => { // "/" 경로로 이동 후 새로고침 하기 위해 1초 타이머
        window.location.reload(); // "/" 경로로 이동 후 새로운 게시물 목록을 받기 위해 새로고침
      }, 100);
    },
    onError(error) {
      console.error(error);
      alert("삭제 중 에러가 발생했습니다.");
    }
  })

  const onDeletePost = () => {
    mutation.mutate();
  }

  return (
    <>
      <Dropdown menu={{ items: post.user.name ? loginItems : items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined />
          </Space>
        </a>
      </Dropdown>

      {/* Alert Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className={style['alert-dialog-content']}>
          <div>
            <h2>삭제하시겠습니까?</h2>
            <p>이 작업은 되돌릴 수 없습니다.<br/>게시글이 영구적으로 삭제됩니다.</p>
          </div>
          <div className={style['alert-dialog-footer']}>
            <AlertDialogCancel asChild>
              <button className={style['btn-cancel']} onClick={() => setIsOpen(false)}>취소</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button className={style['btn-delete']} onClick={() => {
                // 삭제 로직 처리
                onDeletePost();
                setIsOpen(false);
              }}>삭제</button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* 오버레이 */}
      {isOpen && <div className={style['alert-dialog-overlay']} onClick={() => setIsOpen(false)} />}
    </>
  );
}
