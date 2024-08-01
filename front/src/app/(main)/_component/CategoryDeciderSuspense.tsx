import CategoryDecider from "./CategoryDecider";
import style from '../home.module.css';
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function CategoryDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  })
  const dehydratedState = dehydrate(queryClient) //hydrate는 서버에서 온 데이터를 클라이언트에서 그대로 물려받는 것
  
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={style.postsWrapper}>
        <CategoryDecider/>
      </div>
    </HydrationBoundary>
  )
}