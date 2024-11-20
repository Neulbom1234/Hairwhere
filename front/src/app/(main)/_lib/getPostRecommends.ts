type Props = {pageParam?: number};

export async function getPostRecommends({pageParam}: Props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/photo/find/all?page=${pageParam}&size=15`,{    
    next: {
      tags: ['posts', 'recommends'], 
    },
    cache: 'no-store'
  })
  
  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};