type Props = {pageParam?: number};

export async function getWomenPosts({pageParam}: Props) {
  const res = await fetch(`/photo/findByGender/female?page=${pageParam}&size=15`,{
    next: {
      tags: ['posts', 'womens'], //캐시 초기화를 위한 태그
    },
    cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};