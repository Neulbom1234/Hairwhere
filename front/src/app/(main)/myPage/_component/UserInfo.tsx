"use client"

import UserPosts from "./UserPosts"
import style from './userInfo.module.css';
import { useSession } from "next-auth/react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

type Props = {
  username: string,
}

export default function UserInfo({username}: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const { data: me } = useSession();
  console.log(`내 정보: ${JSON.stringify(me, null, 2)}`);

  const editModeToggle = () => {
    setEditName('');
    setEditMode(!editMode);
  }

  const updateName = async () => {
    try {
      const encodedName = encodeURIComponent(editName);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/update/name?name=${encodedName}`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!res.ok) {
        // JSON 형식의 오류 메시지 처리
        const errorData = await res.json();
        console.error("서버 오류 메시지:", errorData.message || errorData);
        alert("닉네임 변경에 실패했습니다.");
      } else {
        editModeToggle();
        window.location.reload();
      }
    } catch (error) {
      console.error("요청 오류:", error);
    }
  };

  if(!me) {
    return (
      <>
        <div className={style.header}>
          <span>프로필</span>
        </div>
        <div className={style.body}>
          <div className={style.container}>
            <div className={style.profileDiv}>
              <div className={style.profile}></div>
            </div>
          </div>
          <div style={{
            height: 100,
            alignItems: 'center',
            fontSize: 31,
            fontWeight: 'bold',
            justifyContent: 'center',
            display: 'flex'
          }}>
            계정이 존재하지 않음
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className={style.header}>
        {editMode
        ? <div className={style.editCancle} onClick={editModeToggle}>
            취소
          </div>
        : <></>}
        <span>프로필</span>
        {editMode 
        ? <div className={style.editComplete} onClick={updateName}>완료</div>
        : <></>}
      </div>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.profileDiv}>
            {me?.user?.image ?
            <Avatar src={me?.user?.image} className={style.profile}/> : 
            <Avatar icon={<UserOutlined />} className={style.profile} />}
            {editMode?
              <input className={style.editName} placeholder={me?.user?.name || ''} maxLength={10} value={editName} onChange={(e) => setEditName(e.target.value)}/>
              :<div className={style.nickname}>{me?.user?.name}</div>}
            {me
              ? editMode 
                ? <></>
                : <div className={style.editProfile} onClick={editModeToggle}>
                    프로필 수정
                  </div> 
              : <></>
            }
          </div>
        </div>
        <div className={style.postsWrapper}>
          <UserPosts username={username}/>
        </div>
      </div>
    </>
  )
}