type Props = {pageParam?: number};

export async function getManPosts({pageParam}: Props) {
  const res = await fetch(`http://localhost:9090/api/manPosts?cursor=${pageParam}`,{
    next: {
      tags: ['posts', 'mans'], //캐시 초기화를 위한 태그
    },
    cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};