import style from './person.module.css';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import UserInfo from './_component/UserInfo';
import { getUser } from './_lib/getUser';
import { getUserPosts } from './_lib/getUserPosts';
import {auth} from "@/auth";

export default async function Profile() {
  const session = await auth();
  const username = session?.user?.name;
  const queryClient = new QueryClient();
  if (username) {
    await queryClient.prefetchQuery({queryKey: ['users', username], queryFn: getUser});
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'users', username], 
      queryFn: getUserPosts,
      initialPageParam: 0,
    });
  }
  const dehydrateState = dehydrate(queryClient);
    return (
      <>
        <div className={style.main}>
          <HydrationBoundary state={dehydrateState}>
            <UserInfo username={username || ''}/>
          </HydrationBoundary>
        </div>
      </>
    )
  }

