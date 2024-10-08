import style from './likes.module.css';
import LikePosts from './_component/LikePosts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getLikePosts } from './_lib/getLikePosts';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const userName = session?.user?.name;
  const queryClient = new QueryClient();
  if (userName) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'likes', userName ], 
      queryFn: getLikePosts,
      initialPageParam: 0,
    });
  }
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <div className={style.main}>
        <HydrationBoundary state={dehydrateState}>
          <div className={style.header}>
            <span>좋아하는 게시글</span>
          </div>
          <div className={style.postsWrapper}>
            <LikePosts userName={userName as string}/>
          </div>
        </HydrationBoundary>
      </div>
    </>
  )
}