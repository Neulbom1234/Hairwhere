type Props = {pageParam?: number};

export async function getWomenPosts({pageParam}: Props) {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/photo/findByGender/female?page=${pageParam}&size=15`,{
  console.log(process.env.BACKEND_API_SERVER)
  const res = await fetch(`${process.env.BACKEND_API_SERVER}/photo/findByGender/female?page=${pageParam}&size=15`,{    

    next: {
      tags: ['posts', 'womens'], //캐시 초기화를 위한 태그
    }
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};