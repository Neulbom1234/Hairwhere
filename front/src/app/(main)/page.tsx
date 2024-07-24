import style from "@/app/(main)/home.module.css"
import Post from "./_component/Post"
import CommonLayout from "./_component/CommonLayout"
import Header from "./_component/Headet";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import PostRecommends from "./_component/PostRecommends";
import CategoryProvider from "./_component/CategoryProvider";
import CategoryDecider from "./_component/CategoryDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends
  })
  const dehydratedState = dehydrate(queryClient) //hydrate는 서버에서 온 데이터를 클라이언트에서 그대로 물려받는 것

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={style.main}>
        <CategoryProvider>
          <Header/>
          <div className={style.postsWrapper}>
            <CategoryDecider/>
          </div>
          <CommonLayout/>
        </CategoryProvider>
      </div>
    </HydrationBoundary>
  )
}