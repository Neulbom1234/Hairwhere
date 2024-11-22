import style from "@/app/(main)/searchResult/searchResult.module.css";
import SearchHeader from '../_component/SearchHeader';
import SearchResult from "./_component/SearchResult";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSearchResult } from "./_lib/getSearchResult";

type Props = {
  searchParams: { hairName: string, gender: string, hairLength: string, hairColor: string };
}

export default async function Page({searchParams}: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <>
      <SearchHeader/>
      <div className={style.postsWrapper}>
        <HydrationBoundary state={dehydrateState}>
          <SearchResult searchParams={searchParams}/>
        </HydrationBoundary>
      </div>
    </>
  )
}