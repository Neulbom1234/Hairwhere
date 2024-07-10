"use client"

import Header from './_component/Header'
import style from './postPage.module.css'
import {faker} from '@faker-js/faker';
import ImageSlider from './_component/ImageSlider';
import {useState, useEffect} from 'react';

interface Image {
  imageId: number;
  link: string;
}

interface Target {
  postId: number;
  User: {
    id: string;
    nickname: string;
  };
  content: string;
  createdAt: Date;
  Images: Image[];
}

export default function Home() {
  const [target, setTarget] = useState<Target | null>(null);

  useEffect(() => {
    const loadTarget = async () => {
      const newTarget = {
        postId: 1,
        User: {
          id: 'elonmusk',
          nickname: 'Elon Musk',
        },
        content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
        createdAt: new Date(),
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
          { imageId: 3, link: faker.image.urlLoremFlickr() },
          { imageId: 4, link: faker.image.urlLoremFlickr() },
        ],
      };

      setTarget(newTarget);
    };

    loadTarget();
  }, []);

  if (!target) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

    return (
      <div className={style.main}>
        <Header/>
        <div className={style.imageWrapper}>
          <ImageSlider target={target}/>
        </div>
      </div>
    )
  }