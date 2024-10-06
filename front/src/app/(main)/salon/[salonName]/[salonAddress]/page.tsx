import style from './salonPage.module.css';
import Header from './_component/Header';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SalonPosts from './_component/SalonPosts';
import { getSalonPosts } from './_lib/getSalonPosts';

type Props = {
  params: { 
    salonName: string,
    salonAddress: string
  };
}

export default async function Page({params}: Props) {
  const salonName = decodeURIComponent(params.salonName);
  const salonAddress = decodeURIComponent(params.salonAddress);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['salon', salonName, salonAddress], queryFn: getSalonPosts});
  const dehydrateState = dehydrate(queryClient);
  return (
    <>
      <div className={style.main}>
        <HydrationBoundary state={dehydrateState}>
          <Header salonName={salonName}/>
          <div className={style.postsWrapper}>
            <SalonPosts salonName={salonName} salonAddress={salonAddress}/>
          </div>
        </HydrationBoundary>
      </div>
    </>
  )
} 