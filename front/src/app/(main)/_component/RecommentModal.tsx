"use client"

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import style from './recomment.module.css'
import { useStore } from '@/store/store';
import { getRecomments } from '../_lib/getRecomments';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Recomments from './Recomments';
import RecommentInput from './RecommentInput';

export default async function RecommentModal() {
  const { recomment, setRecomment, photoId, setPhotoId } = useStore((state) => ({
    recomment: state.recomment,
    setRecomment: state.setRecomment,
    photoId: state.photoId,
    setPhotoId: state.setPhotoId
  }));
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['recomment', photoId!, recomment?.id ? recomment.id.toString() : 'defaultId'], queryFn: getRecomments});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.headerWrapper}>
          <div className={style.header}>
            <Avatar icon={<UserOutlined/>} size={44}/>
            <span className={style.name}>김산호</span>
          </div>
          <div className={style.text}>
            sjldfjsldfljsldjfsjfldsj
          </div>
        </div>
        <RecommentInput id={photoId as string} parentId={recomment?.id ? recomment.id.toString() : 'defaultId'}/>
        <HydrationBoundary state={dehydratedState}>
          <Recomments photoId={photoId as string} id={recomment?.id ? recomment.id.toString() : 'defaultId'}/>
        </HydrationBoundary>
      </div>
    </div>
  )
}