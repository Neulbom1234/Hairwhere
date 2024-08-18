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
  http.post('/login', () => {
    console.log('로그인');
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/' //쿠키 넣기
      }
    })
  }),
  http.post('/logout', () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0' //쿠키 지우기
      }
    })
  }),
  http.post('/register', async ({ request }) => {
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
  http.get('/photo/find/all ', async ({ request }) => {
    await delay(2000);
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json( 
      [
        {
          id: page + 1,
          User: User[0],
          text: '리프펌 너무 예쁘게 해주세요!',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],
          likeCount: [User[0].id, User[1].id],
          hairName: "리프펌",
          hairSalon: "블루클럽",
          hairSalonAddress: "서울 용산구 대사관로30길 21",
          gender: "남성",
          hairLength: "롱",
          hairColor: "그레이"
        },
        {
          id: page + 2,
          User: User[1],
          text: '레이어드컷 맛집입니당',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [],
          hairName: "레이어드컷",
          hairSalon: "아이디어",
          hairSalonAddress: "경기도 고양시 하이파크 3로",
          gender: "여성",
          hairLength: "롱",
          hairColor: "블랙"
        },
        {
          id: page + 3,
          User: User[2],
          text: '숏컷 완전 레전드 ㅠㅠㅠㅠㅠㅠㅠ',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          hairName: "숏컷",
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: page + 4,
          User: User[3],
          text: '손질 하는 방법도 알려주시고 너무 맘에 드는 미용실 발견',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id],
          hairName: "가일컷",
          hairSalon: "블루클럽",
          hairSalonAddress: "서울 동작구 무슨로30길 21",
          gender: "남성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: page + 5,
          User: User[4],
          text: '여기 머리 개못함 다시는 안 간다',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: "가르마펌",
          hairSalon: "두루루루룰",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "남성",
          hairLength: "미디움",
          hairColor: "블랙"
        },
        {
          id: page + 6,
          User: User[5],
          text: '여기 머리 개못함 다시는 안 간다',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: "반삭",
          hairSalon: "두루루루룰",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "남성",
          hairLength: "미디움",
          hairColor: "블랙"
        },
      ]
    )
  }),
  http.get('/photo/findByGender/male', async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('cursor') as string) || 0;

    return HttpResponse.json(
      [
        {
          id: page + 1,
          User: User[0],
          text: '리프펌 너무 예쁘게 해주세요!',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id],
          hairName: "리프펌",
          hairSalon: "블루클럽",
          hairSalonAddress: "서울 용산구 대사관로30길 21",
          gender: "남성",
          hairLength: "롱",
          hairColor: "그레이"
        },
        {
          id: page + 4,
          User: User[3],
          text: '손질 하는 방법도 알려주시고 너무 맘에 드는 미용실 발견',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id],
          hairName: "가일컷",
          hairSalon: "블루클럽",
          hairSalonAddress: "서울 동작구 무슨로30길 21",
          gender: "남성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: page + 5,
          User: User[4],
          text: '여기 머리 개못함 다시는 안 간다',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: "가르마펌",
          hairSalon: "두루루루룰",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "남성",
          hairLength: "미디움",
          hairColor: "블랙"
        },
      ]
    )
  }),
  http.get('/photo/findByGender/female ', async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json(
      [
        {
          id: page + 2,
          User: User[1],
          text: '레이어드컷 맛집입니당',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],
          likeCount: [],
          hairName: "레이어드컷",
          hairSalon: "아이디어",
          hairSalonAddress: "경기도 고양시 하이파크 3로",
          gender: "여성",
          hairLength: "롱",
          hairColor: "블랙"
        },
        {
          id: page + 3,
          User: User[2],
          text: '숏컷 완전 레전드 ㅠㅠㅠㅠㅠㅠㅠ',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: "숏컷",
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
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
          id: cursor + 1,
          User: User[1],
          text: `${1} 검색결과 ${tag}`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${1} 검색결과 ${tag}`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 2,
          User: User[2],
          text: `${2} 검색결과 ${tag}`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${2} 검색결과 ${tag}`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 3,
          User: User[1],
          text: `${3} 검색결과 ${tag}`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${3} 검색결과 ${tag}`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 4,
          User: User[1],
          text: `${4} 검색결과 ${tag}`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${4} 검색결과 ${tag}`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 5,
          User: User[1],
          text: `${5} 검색결과 ${tag}`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${5} 검색결과 ${tag}`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
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
          id: cursor + 1,
          User: User[1],
          text: `${1} ${userId}의 게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${1} ${userId}의 게시글`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 2,
          User: User[2],
          text: `${2} ${userId}의 게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${2} ${userId}의 게시글`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: cursor + 3,
          User: User[1],
          text: `${3} ${userId}의 게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${3} ${userId}의 게시글`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
        {
          id: cursor + 4,
          User: User[1],
          text: `${4} ${userId}의 게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${4} ${userId}의 게시글`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
        {
          id: cursor + 5,
          User: User[1],
          text: `${5} ${userId}의 게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${5} ${userId}의 게시글`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
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
  http.get('/photo/find/:id', ({ request, params }): StrictResponse<any> => {
    const {id} = params;
    if (parseInt(id as string) > 10) {
      return HttpResponse.json({ message: 'no_such_post' }, {
        status: 404,
      })
    }
    return HttpResponse.json(
      {
        id: 5,
        User: User[1],
        text: `게시글 Id ${id}의 내용`,
        created: generateDate(),
        photoImagePath: [
          [faker.image.urlLoremFlickr()],
          [faker.image.urlLoremFlickr()],
          [faker.image.urlLoremFlickr()],
        ],
        likeCount: ['dsf', 'sldjlf'],
        hairName: `게시글 Id ${id}의 내용`,
        hairSalon: "머리잘하는집",
        hairSalonAddress: "서울 구로구 경인로30길 21",
        gender: "여성",
        hairLength: "쇼트",
        hairColor: "블랙"
      
      },
    );
  }),
  http.get('/api/posts/:id/comments', ({ request, params }) => {
    const { id } = params;
    return HttpResponse.json(
      [
        {
          id: 1,
          User: User[0],
          text: `${1} 게시글 ${id}의 답글`,
          photoImagePath: [faker.image.urlLoremFlickr()],          
          created: generateDate(),
        },
        {
          id: 2,
          User: User[0],
          text: `${2} 게시글 ${id}의 답글`,
          photoImagePath: [faker.image.urlLoremFlickr()],
          created: generateDate(),
        },
        {
          id: 3,
          User: User[0],
          text: `${3} 게시글 ${id}의 답글`,
          photoImagePath: [faker.image.urlLoremFlickr()],
          created: generateDate(),
        },
        {
          id: 4,
          User: User[0],
          text: `${4} 게시글 ${id}의 답글`,
          photoImagePath: [faker.image.urlLoremFlickr()],
          created: generateDate(),
        },
        {
          id: 5,
          User: User[0],
          text: `${5} 게시글 ${id}의 답글`,
          photoImagePath: [faker.image.urlLoremFlickr()],
          created: generateDate(),
        },
      ]
    )
  }),

  //좋아하는 게시글
  http.get('/mypage/like', async({request, params})=>{
    await delay(3000);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('cursor') as string) || 0;
  
    return HttpResponse.json(
      [
        {
          id: page + 1,
          User: User[1],
          text: '리프펌',
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `리프펌`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: page + 2,
          User: User[2],
          text: `게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `모히칸`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
        {
          id: page + 3,
          User: User[1],
          text: `게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `폭탄머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: page + 4,
          User: User[1],
          text: `게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `레이어드컷`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
        {
          id: page + 5,
          User: User[1],
          text: `게시글`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `숏컷`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
      ]
    )
  }),
  http.get('/api/salon/:salonName', ({ request, params }) => {
    const { salonName } = params;
    return HttpResponse.json(
      [
        {
          id: 1,
          User: User[1],
          text: `${1} ${salonName}에서 한 머리`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${1} ${salonName}에서 한 머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: 2,
          User: User[2],
          text: `${2} ${salonName}에서 한 머리`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${2} ${salonName}에서 한 머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: 3,
          User: User[1],
          text: `${3} ${salonName}에서 한 머리`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${3} ${salonName}에서 한 머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: 4,
          User: User[1],
          text: `${4} ${salonName}에서 한 머리`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${4} ${salonName}에서 한 머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        },
        {
          id: 5,
          User: User[1],
          text: `${5} ${salonName}에서 한 머리`,
          created: generateDate(),
          photoImagePath: [faker.image.urlLoremFlickr()],          
          likeCount: [User[0].id, User[1].id, User[2].id],
          hairName: `${5} ${salonName}에서 한 머리`,
          hairSalon: "머리잘하는집",
          hairSalonAddress: "서울 구로구 경인로30길 21",
          gender: "여성",
          hairLength: "쇼트",
          hairColor: "블랙"
        
        },
      ]
    )
  }),
];
