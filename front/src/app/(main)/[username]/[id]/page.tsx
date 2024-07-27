import Header from './_component/Header';
import style from './postPage.module.css';
import { faker } from '@faker-js/faker';
import ImageSlider from './_component/ImageSlider';
import { useEffect, useState, useRef, PropsWithRef } from 'react';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import SinglePost from './_component/SinglePost';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getSinglePost } from './_lib/getSinglePost';



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

type Props = {
  params: {id: string}
}

export default async function Home({params}: Props) {
  const {id} = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePost});
  const dehydratedState = dehydrate(queryClient);



  if (!id) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost id={id}/>
      </HydrationBoundary>
    </div>
  );
}
