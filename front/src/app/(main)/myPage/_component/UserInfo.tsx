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
    setEditMode(!editMode);
    console.log(`수정 모드: ${editMode}`);
  }

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
        ? <div className={style.editComplete}>완료</div>
        : <></>}
      </div>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.profileDiv}>
            {me?.user?.image ?
            <Avatar src={me?.user?.image} className={style.profile}/> : 
            <Avatar icon={<UserOutlined />} className={style.profile} />}
            <div className={style.nickname}>{me?.user?.name}</div>
            {me?
              editMode ?
                <></> //input 추가할 예정
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