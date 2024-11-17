"use client"

import style from './commentInput.module.css';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from 'antd';
import { useSession } from "next-auth/react";
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import {useRouter} from "next/navigation";

type Props = {
  id: string
}

export default function CommentInput({id}: Props) {
  const queryClient = useQueryClient();
  const { data: me } = useSession(); 
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const addComment = useMutation({
    mutationFn: () => {
      return fetch(`/comment/${id}?content=${text}`, {
        method: 'POST',
        credentials: 'include'
      })
    }, 
    onMutate() {
      setText("");
    }
  })

  const onAddComment = () => {
    if(!me) {
      router.push('/login');
    } else {
      addComment.mutate();
    }
  }

  return (
    <>
      <div className={style.commentInput}>
          { me && me?.user?.image ?
            <Avatar src={me?.user?.image} className={style.profile} size={42}/>
            : <Avatar icon={<UserOutlined/>} className={style.profile} size={42}/>
          }
          <Textarea 
            className={style.textArea} 
            placeholder="댓글 작성..."
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
          { text && <button className={style.commentButton} onClick={onAddComment}>등록</button> }
        </div>
    </>
  )
}