type Props = {pageParam?: number};

export async function getWomenPosts({pageParam}: Props) {
  const res = await fetch(`http://localhost:9090/api/womenPosts?cursor=${pageParam}`,{
    next: {
      tags: ['posts', 'womens'], //캐시 초기화를 위한 태그
    }
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};