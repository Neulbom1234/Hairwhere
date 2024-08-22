type Props = {pageParam?: number};

export async function getPostRecommends({pageParam}: Props) {
  // const res = await fetch(http://localhost:9090/api/postRecommends?cursor=${pageParam},{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/photo/find/all?page=${pageParam}&size=15`,{    
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