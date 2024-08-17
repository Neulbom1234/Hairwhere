type Props = {pageParam?: number};

export async function getPostRecommends({pageParam}: Props) {
<<<<<<< HEAD
  const res = await fetch(`http://3.35.146.40:8080/photo/find/all?page=${pageParam}&size=15`,{    
=======
  // const res = await fetch(http://localhost:9090/api/postRecommends?cursor=${pageParam},{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/photo/find/all?page=${pageParam}&size=15`,{    
>>>>>>> 5f21712 ([fix] 남성, 여성 게시글 조회 API 연결)
    next: {
      tags: ['posts', 'recommends'], //캐시 초기화를 위한 태그
    },
    cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};