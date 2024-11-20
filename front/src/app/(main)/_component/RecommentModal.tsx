"use client"

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import style from './recomment.module.css'
import { useStore } from '@/store/store';
import { getRecomments } from '../_lib/getRecomments';
import { Avatar } from 'antd';
import Recomments from './Recomments';
import RecommentInput from './RecommentInput';
import { useRouter } from 'next/navigation';

export default async function RecommentModal() {
  const router = useRouter();
  const { recomment, photoId } = useStore((state) => ({
    recomment: state.recomment,
    photoId: state.photoId,
  }));
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['recomment', photoId!, recomment?.id ? recomment.id.toString() : 'defaultId'], queryFn: getRecomments});
  const dehydratedState = dehydrate(queryClient);
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.headerWrapper}>
          <div className={style.header}>
            <Avatar src={recomment?.user.profilePath} size={44}/>
            <span className={style.name}>{recomment?.user.name}</span>
            <button className={style.closeButton} onClick={onClickClose}>
              <svg width={30} viewBox="0 0 24 24" aria-hidden="true"
                    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
          </div>
          <div className={style.text}>
            {recomment?.content}
          </div>
        </div>
        <div className={style.recommentsWrapper}>
          <HydrationBoundary state={dehydratedState}>
            <Recomments photoId={photoId as string} id={recomment?.id ? recomment.id.toString() : 'defaultId'}/>
          </HydrationBoundary>
        </div>
        <RecommentInput id={photoId as string} parentId={recomment?.id ? recomment.id.toString() : 'defaultId'}/>
      </div>
    </div>
  )
}