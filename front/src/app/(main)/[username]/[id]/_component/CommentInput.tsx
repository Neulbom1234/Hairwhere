"use client"

import style from './commentInput.module.css';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from 'antd';
import { useSession } from "next-auth/react";
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

type Props = {
  id: string
}

function CommentInput({id}: Props) {
  const { data: me } = useSession(); 
  const [text, setText] = useState<string>("");

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
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
          { text && <button className={style.commentButton}>등록</button> }
        </div>
    </>
  )
}

export default CommentInput