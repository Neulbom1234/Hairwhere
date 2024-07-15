"use client";
import style from "@/app/(main)/post/post.module.css"
import Link from "next/link"
import {ChangeEventHandler, FormEventHandler, useState} from "react";

export default function Post() {
  const [shop, setShop] = useState();
  const [hair, setHair] = useState();
  const [content, setContent] = useState();
  // const [image, setImage] = useState('');
  // const [imageFile, setImageFile] = useState<File>();
  const [imageUrls, setImageUrls]=useState<string[]>([]);

  const onChangeShop = () => {};
  const onChangeHair = () => {};
  const onChangeContent = () => {};

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgList = e.target.files;
    let imgUrlList: string[] = [];
  
    if (imgList) {
      // 이미지 URL이 3개 이상인 경우 먼저 자릅니다.
      if (imageUrls.length > 3) {
        imgUrlList = imageUrls.slice(0, 3);
        setImageUrls(imgUrlList);
        return;
      }
  
      // 새로 추가된 이미지 파일들의 URL을 생성합니다.
      for (let i = 0; i < imgList.length; i++) {
        const imgUrl = URL.createObjectURL(imgList[i]);
        imgUrlList.push(imgUrl);
      }
  
      // 기존 URL과 새로 추가된 URL을 합칩니다.
      setImageUrls([...imageUrls, ...imgUrlList]);
  
      // 만약 총 URL 수가 3개를 초과한다면 잘라냅니다.
      if (imageUrls.length + imgUrlList.length > 3) {
        setImageUrls((prevUrls) => prevUrls.slice(0, 3));
      }
    }
  };
  

  return (
    <div className={style.main}>
        <div className={style.header}>
          <span>게시글 작성</span>
        </div>


        {/* .....왜.. 안 되는 걸까.....? */}
        {/* 사진등록 */}
        <div className={style.addPhoto}>
          <div className={style.photos}>
            {imageUrls.map((imageUrl, index) => (
              <img key={index} src={imageUrl} className={style.previewImage} />
            ))}
          </div>
          
          <input type="file" className={style.photo} onChange={onAddImage} multiple />                 
        </div>

        {/* 아이콘 */}
        <div className={style.iconBox}>
          <div className={style.reLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
          </div>
          <div className={style.hairDiv}>
            <select className={style.gender}>
              <option value="0" disabled>성별</option>
              <option value="1">남자</option>
              <option value="2">여자</option>
            </select>
          </div>
          <div className={style.hairDiv}>
            <select className={style.hairLength}>
              <option value="0" disabled>길이</option>
              <option value="1">남자</option>
              <option value="2">여자</option>
            </select>
          </div>
          <div className={style.hairDiv}>
            <select className={style.hairColor}>
              <option value="0" disabled>색상</option>
              <option value="1">남자</option>
              <option value="2">여자</option>
            </select>
          </div>
        </div>

        {/* 미용실 입력 */}
        <div className={style.choiceShop}>
          <input id="shop" className={style.shopInput} value={shop} onChange={onChangeShop} type="text" placeholder="미용실 입력..."/>
          <Link href="/login" className={style.shopBtn}>게시글 등록</Link>
        </div>
        

        {/* 헤어이름 입력 */}
        <div className={style.choiceHair}>
          <input id="hair" className={style.hairInput} value={hair} onChange={onChangeHair} type="text" placeholder="헤어이름 입력..."/>
        </div>


        {/* 게시글 내용 작성 */}
        <div className={style.postContent}>
          <textarea id="content" className={style.content} value={content} onChange={onChangeContent} placeholder="게시글 작성..."/>
        </div>

        <Link href="/login" className={style.postButton}>게시글 등록</Link>
    </div>
    )
  }