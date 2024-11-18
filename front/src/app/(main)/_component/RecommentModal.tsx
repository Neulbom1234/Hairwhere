import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import style from './recomment.module.css'
import { useStore } from '@/store/store';
import { getRecomments } from '../_lib/getRecomments';

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
        <HydrationBoundary state={dehydratedState}>

        </HydrationBoundary>
      </div>
    </div>
  )
}