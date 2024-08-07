// (main) > _lib >
type Props = {pageParam?: number};

export async function getPostRecommends({pageParam}: Props) {
  const res = await fetch(`http://3.35.146.40:8080/photo/find/all?page=${pageParam}&size=15`,{    
    next: {
      tags: ['posts', 'recommends'], //캐시 초기화를 위한 태그
    }
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};