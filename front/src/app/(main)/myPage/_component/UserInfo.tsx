"use client"

import UserPosts from "./UserPosts"
import style from './userInfo.module.css';
import { useSession } from "next-auth/react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import { useStore, useSyncNameFromSession } from "@/store/store";

type Props = {
  username: string,
}

export default function UserInfo({username}: Props) {
  const { name, setName } = useStore((state) => ({
    name: state.name,
    setName: state.setName,
  }));
  useSyncNameFromSession();
  const { data: me, update } = useSession();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  console.log(`내 정보: ${JSON.stringify(me, null, 2)}`);

  const {
    data,
    isFetching,
  } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editModeToggle = () => {
    setEditName('');
    setSelectedImage(null);
    setEditMode(!editMode);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // 여기에서 사진을 서버에 업로드하는 로직을 추가할 수 있습니다.
    }
  };

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 클릭
    }
  };

  const updateProfile = async () => {
    try {
      if(editName !== "") {
        const encodedName = encodeURIComponent(editName);
        const res = await fetch(`/update/name?name=${encodedName}`, {
          method: 'PATCH',
          credentials: 'include',
        });
        if (!res.ok) {
          // JSON 형식의 오류 메시지 처리
          const errorData = await res.json();
          console.error("서버 오류 메시지:", errorData.message || errorData);
          alert("닉네임 변경에 실패했습니다.");
        } else {
          setName(editName);
        }
      }
      if(selectedImage !== null) {
        console.log("실행되었어용", image);
        setImage(selectedImage);
        // const formData = new FormData();
        // formData.append('profile', selectedImage);
        // const res = await fetch(`/update/profile`, {
        //   method: 'PATCH',
        //   credentials: 'include',
        //   body: formData
        // });
        // if (!res.ok) {
        //   // JSON 형식의 오류 메시지 처리
        //   const errorData = await res.json();
        //   console.error("서버 오류 메시지:", errorData.message || errorData);
        //   alert("사진 변경에 실패했습니다.");
        // } else {
        //   setImage(selectedImage);
        // }
      }
      editModeToggle();
    } catch (error) {
      console.error("요청 오류:", error);
    }
  };

  const avatarSrc = selectedImage ? URL.createObjectURL(selectedImage) : me?.user?.image;
  const changedAvatarSrc = image ? URL.createObjectURL(image) : me?.user?.image;
  const isCompleteDisabled = !editName && !selectedImage;
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
        ? <div className={isCompleteDisabled ? style.disabledButton : style.editComplete} onClick={isCompleteDisabled ? undefined : updateProfile}>
            완료
          </div>
        : <></>}
      </div>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.profileDiv}>
            <div className={style.avatarWrapper}>
              <Avatar 
                src={editMode ? (selectedImage ? avatarSrc : me?.user?.image) : (image ? changedAvatarSrc : me?.user?.image)}
                className={style.profile} 
                icon={!(me?.user?.image || selectedImage) && <UserOutlined />}
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={style.fileInput}
                  ref={fileInputRef}
                />
              )}
              {editMode && (
                <div className={style.plusIcon} onClick={handlePlusClick}>+</div> // + 버튼
              )}

            </div>
            {editMode?
              <input className={style.editName} placeholder={me?.user?.name || ''} maxLength={10} value={editName} onChange={(e) => setEditName(e.target.value)}/>
              :<div className={style.nickname}>{name}</div>}
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