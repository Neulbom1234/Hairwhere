# ✂️ 헤어스타일 커뮤니티 서비스 HAIRWHERE

<div align="center">
  <img src="https://github.com/user-attachments/assets/6666ae4a-f8db-465d-82aa-552c49dd9999" alt="logo1" width="50%">
</div>

- 배포 URL : https://hairwhere.vercel.app

<br>

## 프로젝트 소개

- HAIRWHERE는 헤어스타일에 관심있는 사람들이 헤어스타일에 대한 정보를 공유하는 SNS입니다.
- 본인의 헤어스타일 사진과 함께 헤어스타일 이름, 기장, 색, 미용실 정보를 공유할 수 있습니다.
- 검색을 통해 여러 유저들의 헤어스타일을 볼 수 있습니다.
- 마음에 드는 게시글에 좋아요를 누르거나 댓글을 작성할 수 있습니다.

<br>

## 팀원 구성

<h3 align="center">Frontend</h3>

<div align="center">

| **김산호** | **이서영** |
| :------: |  :------: |
| [<img src="https://github.com/coral0723.png" height=150 width=150> <br/> @coral0723](https://github.com/coral0723) | [<img src="https://github.com/iamseoyoung.png" height=150 width=150> <br/> @iamseoyoung](https://github.com/iamseoyoung) | 
</div>

<h3 align="center">Backend</h3>

<div align="center">

| **박동준** |
| :------: |
| [<img src="https://github.com/qkrehdwns032.png" height=150 width=150> <br/> @qkrehdwns032](https://github.com/qkrehdwns032) | 

</div>

<br>

## 1. 개발 스택

<h3 align="center">Frontend</h3>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Auth.js-35495E?style=for-the-badge&logo=auth0&logoColor=white" alt="Auth.js" />
  <img src="https://img.shields.io/badge/Zustand-333333?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/CSS%20Modules-1572B6?style=for-the-badge&logo=cssmodules&logoColor=white" alt="CSS Modules" />
  <img src="https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white" alt="Ant Design" />
  <img src="https://img.shields.io/badge/shadcn-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="shadcn" />
  <img src="https://img.shields.io/badge/Faker.js-FB7A24?style=for-the-badge&logo=faker&logoColor=white" alt="Faker.js" />
  <img src="https://img.shields.io/badge/MSW-84A3FD?style=for-the-badge&logo=mock-service-worker&logoColor=white" alt="Mock Service Worker" />
  <img src="https://img.shields.io/badge/Day.js-FF5F5F?style=for-the-badge&logo=day.js&logoColor=white" alt="Day.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Kakao%20API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" alt="Kakao API" />
</div>

<h3 align="center">Backend</h3>

<div align="center">
  <img src="https://img.shields.io/badge/Java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/Spring%20Framework-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Framework" />
  <img src="https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Naver%20Cloud-%2300C73C.svg?style=for-the-badge&logo=naver&logoColor=white" alt="Naver Cloud" />
  <img src="https://img.shields.io/badge/Ubuntu-%23E95420.svg?style=for-the-badge&logo=ubuntu&logoColor=white" alt="Ubuntu" />
</div>


<br>

## 2. 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature, fix, style 등의 보조 브랜치를 운용했습니다.
- main, develop 브랜치로 나누고 develop 브랜치에서 이슈의 종류에 맞는 브랜치를 다시 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **feature**, **fix**, **style** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 역할 분담

### 🪸김산호

- **UI**
    - 페이지 : 홈, 검색, 게시글, 유저, 미용실, 미용실 검색, 프로필 수정
    - 공용 컴포넌트 : NavBar, Post, 남녀 카테고리 버튼, 검색 카테고리, 댓글/대댓글, Alert 모달, Loading
- **기능**
    - 로그인/로그아웃, 회원가입, 남녀 게시글 변경, 유저 프로필 불러오기, 게시글 상세 확인, 검색 기능, 게시글 등록 및 삭제, 미용실 검색, 프로필 수정, 댓글/대댓글 등록, 좋아요 기능

<br>
    
### 🐩이서영

- **UI**
    - 페이지 : 로그인, 회원가입, 게시글 작성, 좋아요, 프로필
    - 공용 컴포넌트 : Header, Avatar, 카테고리 태그
- **기능**
    - 게시글 인피니트 스크롤링

<br>

### 😸박동준

- **기능**
    - 로그인/로그아웃, 회원가입, 게시글 불러오기, 게시글 등록 및 삭제, 검색, 좋아요, 프로필 수정, 댓글/대댓글 등의 전체적인 백엔드 기능 담당
    
<br>

## 4. 페이지별 기능

### [홈 피드]
- 유저의 게시글들이 최신순으로 보여집니다.
- 우측 하단의 성별 버튼을 통해 남성, 여성 게시글을 필터링 하여 볼 수 있습니다.
- 로그인 후 좋아요를 누를 수 있고 게시글 클릭 시 게시글 상세 페이지로 이동합니다.

| 홈 피드 | 좋아요&페이지 이동 |
|----------|----------|
|![home0](https://github.com/user-attachments/assets/b3b9d037-ff34-45ff-9d48-1339bbecac82)|![홈피드(좋아요 이동)](https://github.com/user-attachments/assets/fa937300-6698-4a2d-ad9c-7d4140e4ab34)|


<br>

### [회원가입]
- 아이디, 비밀번호, 닉네임, 이메일, 프로필 사진을 입력하면 가입할 수 있습니다.

| 회원가입 |
|----------|
|![image](https://github.com/user-attachments/assets/3cc7e910-a630-4cc1-9f29-75c0e4222c44)|

<br>

### [로그인]
- 아이디와 비밀번호를 입력하면 입력창에서 유효성 검사를 통해 통과하지 못 할 경우 경고 문구가 나타나게 됩니다.
- 아이디 형식이 유효하지 않거나 비밀번호가 틀렸을 경우에는 하단에 경구 문구가 나타납니다.
- 로그인에 성공하면 홈 피드 화면으로 이동합니다.

| 로그인 | 아이디 형식 틀림 | 아이디/비밀번호 틀림 |
|----------|----------|----------|
|![image](https://github.com/user-attachments/assets/e3ba6105-be37-4551-ac16-f40331f23f8e)|![image](https://github.com/user-attachments/assets/f51e77dd-fcc2-4f40-b5ba-e2ad7001de45)|![image](https://github.com/user-attachments/assets/f45eb59f-55bf-4a1f-bc2b-4d8cfe5073e3)

<br>

### [로그아웃]
- 우측 상단의 로그아웃 버튼을 클릭하면 로그아웃이 진행됩니다.
- 로그아웃시 쿠키를 삭제하고 초기화면으로 이동합니다.

| 로그아웃 |
|----------|
|![로그아웃](https://github.com/user-attachments/assets/25f0cc78-96c7-4201-9ad8-8351cc11bd60)|

<br>

### [검색]
- 헤어스타일로 게시글을 검색할 수 있습니다.
- 왼쪽 상단의 필터 버튼을 눌러 성별, 기장, 색을 선택할 수 있습니다.

| 검색 |
|----------|
|![검색](https://github.com/user-attachments/assets/370f515f-a1b4-4d06-a5fb-e754941461b3)|

<br>


### [게시글]

#### 1. 게시글 작성
- 모든 항목이 입력되면 업로드 버튼이 활성화됩니다.
- 최대 세 장까지 이미지 첨부가 가능하며 첨부한 파일을 취소할 수 있습니다.

| 게시글 작성 |
|----------|
|![게시글 작성](https://github.com/user-attachments/assets/f489f84d-bc9f-4751-8d1b-68784a865bfc)|

<br>

#### 2. 게시글 삭제
- 자신의 게시글일 경우 삭제가 가능합니다.
- 게시글 삭제 버튼 클릭 시, 게시글을 삭제하고 페이지를 리렌더링하여 삭제된 내용을 페이지에 반영합니다.

| 게시글 삭제 |
|----------|
|![게시글 삭제](https://github.com/user-attachments/assets/3710e9b5-476a-4ba9-9d08-00402f2064eb)|

<br>

#### 3. 댓글/대댓글
- 게시글에 댓글을 등록할 수 있습니다.
- 대댓글을 등록할 수 있습니다.

| 댓글 | 대댓글 |
|----------|----------|
|![댓글](https://github.com/user-attachments/assets/fd419a5a-b477-43da-b747-433dc18621e1)| ![대댓글](https://github.com/user-attachments/assets/ff3fdce5-7f14-4a21-9b9c-a08f7d5ca9cc)|

<br>

#### 4. 유저 프로필
- 게시글의 유저 프로필을 누르면 이동합니다.
- 유저가 올린 게시글을 볼 수 있습니다.

| 유저 프로필 |
|----------|
|![유저 프로필](https://github.com/user-attachments/assets/a010f7c0-9dfb-4c76-a577-714711a4353d)|

<br>

#### 5. 미용실
- 게시글에 등록된 미용실 이름을 클릭하면 등록된 다른 글들을 볼 수 있습니다.

| 프로필 설정 |
|----------|
|![미용실](https://github.com/user-attachments/assets/b5a5f8e4-a03d-41ac-8ae4-b6478ad8c71d)|

<br>

### [좋아요]

- 사용자가 좋아요를 누른 게시글들을 볼 수 있습니다.

| 상품 등록 |
|----------|
|![image](https://github.com/user-attachments/assets/3cfb8f03-023a-4983-a977-84a5ab3c1341)|

<br>

### [프로필]
- 본인이 업로드한 게시글 들을 볼 수 있습니다.
- 닉네임, 프로필 사진 변경을 할 수 있습니다.

| 프로필 수정 |
|----------|
|![프로필 수정](https://github.com/user-attachments/assets/419d27fe-7fc7-4820-bbd1-220392bafefe)|

<br>

### [하단 탭 메뉴]
- 하단 탭 메뉴 : 홈, 검색, 게시물 작성, 좋아요 페이지, 내 프로필 페이지로 이동합니다.

| 하단 탭 |
|----------|
|![하단탭바](https://github.com/user-attachments/assets/47fe6313-1056-40b0-ab82-851f4329d71e)|

<br>

## 5. ERD

<img width="1004" alt="image" src="https://github.com/user-attachments/assets/a09c13ce-4053-4352-b73a-582d9a77b0b8">

<br>

## 6. 프로젝트 구조

### [Frontend]

```
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
├── next.config.json
├── tailwind.config.json
├── tsconfig.json
├── public
│    ├── logo.svg
│    └── mockServiceWorker.js
└── src
     └── app
          ├── _component
          │    ├── mockServiceWorker.tsx
          │    └── MSWcomponent.tsx
          ├── api\auth\[...nextauth]
          │    └── route.ts
          ├── globals.css
          ├── layout.tsx
          ├── notFound.tsx
          ├── components\ui
          ├── lib
          ├── mocks
          ├── model
          ├── store
          └── (main)
               ├── _component
               ├── _lib
               ├── [username]
               ├── @modal
               ├── likes
               ├── login
               ├── myPage
               ├── notice
               ├── post
               ├── recomment
               ├── register
               ├── salon
               ├── search
               ├── searchResult
               ├── error.tsx
               ├── page.tsx
               ├── home.module.css
               ├── layout.tsx
               ├── layout.module.css
               └── loading.tsx
```
### [Backend]
```
└──src
  └──main
    └──java
      └──com.example.neulbom
        └──config
          └──NCPConfig
          └──SecurityConfig
        └──controller
          └──CommentController
          └──GlobalExeptionHandler
          └──LikeController
          └──PhotoController
          └──UserController
        └──domain
          └──Comment
          └──Like
          └──Photo
          └──User
        └──dto
          └──CommentRequest
          └──CommentResponse
          └──LoginRequest
          └──PhotoResponse
          └──Register
          └──Upload
          └──UserUploadResponse
        └──repository
          └──CommentRepository
          └──LikeRepository
          └──PhotoRepository
          └──UserRepository
        └──service
          └──CommentService
          └──LikeService
          └──NCPStorageService
          └──PhotoService
          └──UserService
      └──NeulbomApplication
    └──resources
      application.yml
  └──test
```

<br>
