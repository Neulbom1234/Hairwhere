import style from './postPage.module.css';
import SinglePost from './_component/SinglePost';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getSinglePost } from './_lib/getSinglePost';
import CommentInput from './_component/CommentInput';
import Comment from './_component/Comment';

type Props = {
  params: {id: string}
}

export default async function Home({params}: Props) {
  const {id} = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['post', id], queryFn: getSinglePost});
  const dehydratedState = dehydrate(queryClient);

  if (!id) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost id={id}/>
        <CommentInput id={id} />
        <Comment/>
      </HydrationBoundary>
    </div>
  );
}
