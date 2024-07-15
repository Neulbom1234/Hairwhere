"use client"

import Header from './_component/Header';
import style from './postPage.module.css';
import { faker } from '@faker-js/faker';
import ImageSlider from './_component/ImageSlider';
import { useEffect, useState, useRef } from 'react';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

type Image = {
  imageId: number;
  link: string;
};

type User = {
  id: string;
  nickname: string;
  profile: string;
};

type HairInfo = {
  hairName: string,
  hairSalon: string,
  hairSalonAddress: string,
}

type Target = {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: Image[];
  likes: string[];
  HairInfo: HairInfo;
};

export default function Home() {
  const [target, setTarget] = useState<Target | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loadTarget = async () => {
      const newTarget: Target = {
        postId: 1,
        User: {
          id: 'elonmusk',
          nickname: 'Elon Musk',
          profile: '',
        },
        content: '여기 리프펌 완전 잘해요! 짱짱~~yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
        createdAt: new Date(),
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
        ],
        likes: [],
        HairInfo: {
          hairName: '리프펌',
          hairSalon: '블루클럽',
          hairSalonAddress: '서울 용산구 대사관로30길 21'
        },
      };

      setTarget(newTarget);
    };

    loadTarget();
  }, []);

  const copyToClipboard = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.innerText)
        .then(() => {
          alert('주소가 클립보드에 복사되었습니다.');
        })
        .catch((err) => {
          console.error('복사 중 에러 발생:', err);
        });
    }
  };

  if (!target) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <div className={style.main}>
      <Header target={target}/>
      <div className={style.imageWrapper}>
        <ImageSlider target={target} />
      </div>
      <div className={style.hairInfoWrapper}>
        <div className={style.hairName}>{target.HairInfo.hairName}</div>
        <div className={style.hairSalon}>
          <Link href={`/salon/${target.HairInfo.hairSalon}`}>
            {target.HairInfo.hairSalon}
          </Link>
          </div>
        <span className={style.hairSalonAddress} ref={textRef} onClick={copyToClipboard}>{target.HairInfo.hairSalonAddress}</span>
      </div>
      <div className={style.userBadge}>
        <Link href={`/${target.User.id}`}>
          {target.User.profile === '' ?
            <Avatar size={44} icon={<UserOutlined/>} /> :
            <Avatar size={44} src={target.User.profile} />
          }
          <div className={style.userName}>{target.User.nickname}</div>
        </Link>
      </div>
      <Divider/>
      <div className={style.content}>
        {target.content}
      </div>
    </div>
  );
}
