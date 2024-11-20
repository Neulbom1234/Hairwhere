type Props = {pageParam?: number};

export async function getManPosts({pageParam}: Props) {
  const res = await fetch(`/photo/findByGender/male?page=${pageParam}&size=15`,{
    next: {
        tags: ['posts', 'mans'], 
      },
      cache: 'no-store'
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

