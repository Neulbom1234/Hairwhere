export async function getManPosts() {
  const res = await fetch(`http://localhost:9090/api/manPosts`,{
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