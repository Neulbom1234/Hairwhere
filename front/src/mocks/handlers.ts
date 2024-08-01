import {http, HttpResponse, StrictResponse} from 'msw'
import {faker} from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}
const User = [
  {id: 'kimsanho', nickname: '산호초', profile: ''},
  {id: 'winter', nickname: '윈터', profile: ''},
  {id: 'eseo0eseo0', nickname: '서빵이', profile: faker.image.avatar()},
  {id: 'elonmusk', nickname: '일론 머스크', profile: faker.image.avatar()},
  {id: 'trump', nickname: '트럼프입니다', profile: faker.image.avatar()},
  {id: 'bbook', nickname: '뿍뿍이입니다', profile: faker.image.avatar()},
]
const Posts = [];
const delay = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

export const handlers = [
  http.post('/api/login', () => {
    console.log('로그인');
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/' //쿠키 넣기
      }
    })
  }),
  http.post('/api/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0' //쿠키 지우기
      }
    })
  }),
  http.post('/api/users', async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // })
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    })
  }),
  http.get('/api/postRecommends', async ({ request }) => {
    await delay(2000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json( 
      [
        {
          postId: cursor + 1,
          User: User[0],
          content: '리프펌 너무 예쁘게 해주세요!',
          createdAt: generateDate(),
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id],
          HairInfo: {
            hairname: "리프펌",
            hairSalon: "블루클럽",
            hairSalonAddress: "서울 용산구 대사관로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "롱",
            hairColor: "그레이"
          }
        },
        {
          postId: cursor + 2,
          User: User[1],
          content: '레이어드컷 맛집입니당',
          createdAt: generateDate(),
          Images: [{imageId: 2, link: faker.image.urlLoremFlickr()}],
          likes: [],
          HairInfo: {
            hairname: "레이어드컷",
            hairSalon: "아이디어",
            hairSalonAddress: "경기도 고양시 하이파크 3로"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "롱",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 3,
          User: User[2],
          content: '숏컷 완전 레전드 ㅠㅠㅠㅠㅠㅠㅠ',
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: "숏컷",
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 4,
          User: User[3],
          content: '손질 하는 방법도 알려주시고 너무 맘에 드는 미용실 발견',
          createdAt: generateDate(),
          Images: [{imageId: 4, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id],
          HairInfo: {
            hairname: "가일컷",
            hairSalon: "블루클럽",
            hairSalonAddress: "서울 동작구 무슨로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 5,
          User: User[4],
          content: '여기 머리 개못함 다시는 안 간다',
          createdAt: generateDate(),
          Images: [{imageId: 5, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: "가르마펌",
            hairSalon: "두루루루룰",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "미디움",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 6,
          User: User[5],
          content: '여기 머리 개못함 다시는 안 간다',
          createdAt: generateDate(),
          Images: [{imageId: 5, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: "반삭",
            hairSalon: "두루루루룰",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "미디움",
            hairColor: "블랙"
          }
        },
      ]
    )
  }),
  http.get('/api/manPosts', async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[0],
          content: '리프펌 너무 예쁘게 해주세요!',
          createdAt: generateDate(),
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id],
          HairInfo: {
            hairname: "리프펌",
            hairSalon: "블루클럽",
            hairSalonAddress: "서울 용산구 대사관로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "롱",
            hairColor: "그레이"
          }
        },
        {
          postId: cursor + 4,
          User: User[3],
          content: '손질 하는 방법도 알려주시고 너무 맘에 드는 미용실 발견',
          createdAt: generateDate(),
          Images: [{imageId: 4, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id],
          HairInfo: {
            hairname: "가일컷",
            hairSalon: "블루클럽",
            hairSalonAddress: "서울 동작구 무슨로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 5,
          User: User[4],
          content: '여기 머리 개못함 다시는 안 간다',
          createdAt: generateDate(),
          Images: [{imageId: 5, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: "가르마펌",
            hairSalon: "두루루루룰",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "남성",
            hairLength: "미디움",
            hairColor: "블랙"
          }
        },
      ]
    )
  }),
  http.get('/api/womenPosts', async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json(
      [
        {
          postId: cursor + 2,
          User: User[1],
          content: '레이어드컷 맛집입니당',
          createdAt: generateDate(),
          Images: [{imageId: 2, link: faker.image.urlLoremFlickr()}],
          likes: [],
          HairInfo: {
            hairname: "레이어드컷",
            hairSalon: "아이디어",
            hairSalonAddress: "경기도 고양시 하이파크 3로"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "롱",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 3,
          User: User[2],
          content: '숏컷 완전 레전드 ㅠㅠㅠㅠㅠㅠㅠ',
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: "숏컷",
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
      ]
    )
  }),
  http.get('/api/search/:tag', async ({ request, params }) => {
    const { tag } = params;
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[1],
          content: `${1} 검색결과 ${tag}`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${1} 검색결과 ${tag}`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 2,
          User: User[2],
          content: `${2} 검색결과 ${tag}`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${2} 검색결과 ${tag}`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 3,
          User: User[1],
          content: `${3} 검색결과 ${tag}`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${3} 검색결과 ${tag}`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 4,
          User: User[1],
          content: `${4} 검색결과 ${tag}`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${4} 검색결과 ${tag}`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 5,
          User: User[1],
          content: `${5} 검색결과 ${tag}`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${5} 검색결과 ${tag}`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
      ]
    )
  }),
  http.get('/api/users/:userId/posts', async({ request, params }) => {
    const { userId } = params;
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[1],
          content: `${1} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${1} ${userId}의 게시글`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 2,
          User: User[2],
          content: `${2} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${2} ${userId}의 게시글`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 3,
          User: User[1],
          content: `${3} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${3} ${userId}의 게시글`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 4,
          User: User[1],
          content: `${4} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${4} ${userId}의 게시글`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 5,
          User: User[1],
          content: `${5} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `${5} ${userId}의 게시글`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
      ]
    )
  }),
  http.get('/api/users/:userId', ({ request, params }): StrictResponse<any> => {
    const {userId} = params;
    const found = User.find((v) => v.id === userId);
    if (found) {
      return HttpResponse.json(
        found,
      );
    }
    return HttpResponse.json({ message: 'no_such_user' }, {
      status: 404,
    })
  }),
  http.get('/api/posts/:postId', ({ request, params }): StrictResponse<any> => {
    const {postId} = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json({ message: 'no_such_post' }, {
        status: 404,
      })
    }
    return HttpResponse.json(
      {
        postId: 5,
        User: User[1],
        content: `게시글 Id ${postId}의 내용`,
        createdAt: generateDate(),
        Images: [
          {imageId: 3, link: faker.image.urlLoremFlickr()},
          {imageId: 4, link: faker.image.urlLoremFlickr()},
          {imageId: 5, link: faker.image.urlLoremFlickr()},
        ],
        likes: ['dsf', 'sldjlf'],
        HairInfo: {
          hairname: `게시글 Id ${postId}의 내용`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21"
        },
        HairCategory: {
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        }
      },
    );
  }),
  http.get('/api/posts/:postId/comments', ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${1} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${3} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${4} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
          content: `${5} 게시글 ${postId}의 답글`,
          Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
          createdAt: generateDate(),
        },
      ]
    )
  }),

  //좋아하는 게시글
  http.get('api/users/:user/likes', async({request, params})=>{
    const { userId } = params;
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
  
    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[1],
          content: '리프펌',
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `리프펌`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 2,
          User: User[2],
          content: `${2} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `모히칸`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 3,
          User: User[1],
          content: `${3} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `폭탄머리`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 4,
          User: User[1],
          content: `${4} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `레이어드컷`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
        {
          postId: cursor + 5,
          User: User[1],
          content: `${5} ${userId}의 게시글`,
          createdAt: generateDate(),
          Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
          likes: [User[0].id, User[1].id, User[2].id],
          HairInfo: {
            hairname: `숏컷`,
            hairSalon: "머리잘하는집",
            hairSalonAddress: "서울 구로구 경인로30길 21"
          },
          HairCategory: {
            gender: "여성",
            hairLength: "쇼트",
            hairColor: "블랙"
          }
        },
      ]
    )
  })
];
