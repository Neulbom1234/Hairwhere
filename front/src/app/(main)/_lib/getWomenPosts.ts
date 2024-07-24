export async function getWomenPosts() {
  const res = await fetch(`http://localhost:9090/api/womenPosts`,{
    next: {
      tags: ['posts', 'womens'], //캐시 초기화를 위한 태그
    }
  })

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};