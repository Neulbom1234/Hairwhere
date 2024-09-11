"use client";

import style from "@/app/(main)/post/post.module.css";
import Link from "next/link";
import { ChangeEventHandler, FormEvent, useEffect, useState, useRef} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type { PageInfo } from "@/model/PageInfo";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

type Props = {
  params?: { sn: string, sa: string };
}

type PreviewType = { 
  dataUrl: string; 
  file: File 
};

export default function PostBody({params}: Props) {
  const {
    shop, setShop,
    shopAddress, setShopAddress,
    hairName, setHairName,
    text, setText,
    preview, setPreview,
    imgMax, setImgMax,
    gender, setGender,
    hairLength, setHairLength,
    hairColor, setHairColor
  } = useStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if(params) {
      setShop(params.sn);
      setShopAddress(params.sa);
      console.log(`shop: ${shop}, shopAdress: ${shopAddress}`);
    }
  }, [params])

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      console.log(document.cookie);
      // FormData 객체 생성 및 preview 파일 추가
      const formData = new FormData();
      preview.forEach((p) => {
        p && formData.append('photoImagePath', p.file);
      });
      formData.append('text', text);
      formData.append('hairName', hairName);
      formData.append('hairLength', hairLength);
      formData.append('hairColor', hairColor);
      formData.append('gender', gender);
      formData.append('hairSalon', shop);
      formData.append('hairSalonAddress', shopAddress);
      formData.append('created', new Date().toISOString().split('.')[0]);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:, ${value}`);
      }
      const response = await fetch(`/photo/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        // response.ok가 false면 onError로 넘어갑니다.
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      console.log(`response입니다: ${response.json()}`);
  
      return response;

    },
    async onSuccess(response) {
      // const newPost = await response.json();
      setText('');
      setPreview([]);
      setHairName('');
      setHairColor("0");
      setHairLength("0");
      setGender("0");
      setShop('');
      setShopAddress('');
      // if(queryClient.getQueryData(['posts', 'recommends'])) {
      //   queryClient.setQueryData(['posts', 'recommends'], (prevData: {pages: PageInfo[]}) => {
      //     const shallow = {
      //       ...prevData,
      //       pages: [...prevData.pages],
      //     };
      //     shallow.pages[0] = {
      //       ...shallow.pages[0],
      //     // @ts-ignore
      //       content: [response, ...shallow.pages[0].content],
      //     };
      //     return shallow;
      //   })
      // }
      router.push('/');
    },
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    }
  });
  

  
  const onChangeShop: ChangeEventHandler<HTMLInputElement> = (e) => {
    setShop(e.target.value);
  };

  const onChangeHairName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHairName(e.target.value);
  };

  const onChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // 이미 3장의 사진이 등록된 상태라면 더 이상 처리하지 않음
      if (files.length > 3) {
        setImgMax('사진은 최대 3장 등록 가능합니다!');
        return;
      }

      const fileArray = Array.from(files).slice(0, 3);  // 파일 목록에서 처음 3개만 가져옴
      const previewsToAdd: PreviewType[] = [];

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            const dataUrl = event.target.result;
            const newPreview: PreviewType = { dataUrl, file };
            previewsToAdd.push(newPreview);

            // 모든 파일이 읽힌 후에 상태를 업데이트
            if (previewsToAdd.length === fileArray.length) {
              setPreview((prevPreview) => {
                const totalPreviews = prevPreview.length + previewsToAdd.length;
                if (totalPreviews > 3) {
                  setImgMax('사진은 최대 3장 등록 가능합니다!');
                  return [...prevPreview, ...previewsToAdd.slice(0, 3 - prevPreview.length)];
                }
                return [...prevPreview, ...previewsToAdd];
              });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };


  const handleDeletePreview = (index: number) => {
    setPreview((prevPreview) => {
      const newPreviews = [...prevPreview];
      newPreviews.splice(index, 1);

      if (newPreviews.length < 3) {
        setImgMax('');
      }

      return newPreviews;
    });
  };

  const reLoad = () => {
    setGender("");
    setHairLength("");
    setHairColor("");
  };

  const isButtonEnabled =
    shop !== "" &&
    shopAddress !== "" &&
    hairName !== "" &&
    text !== "" &&
    imgMax === "" &&
    gender !== "" &&
    hairLength !== "" &&
    hairColor !== "" &&
    preview.length > 0;

  return (
    <>
    <form onSubmit={mutation.mutate}>
      {/* 사진등록 */}
      <div className={style.imgContainer}>
        {preview.map((p, index) => (
          <div key={index} className={style.imgBox}>
            <img src={p?.dataUrl} className={style.previewImage} alt={`Preview ${index}`} />            
            <button className={style.closeButton} onClick={() => handleDeletePreview(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </button>
          </div>
        ))}
      </div>
      
      {/* 이미지 개수 제한 안내 */}
      {preview.length === 3 && (
        <span className={style.imgMax}>{imgMax}</span>
      )}

      {/* 파일 선택 */}
      {preview.length < 3 && (
        <label className={style.imgBtn} htmlFor="img">
          <div>파일 선택</div>
          <input id="img" type="file" name="photoImagePath[]" multiple hidden ref={imageRef} onChange={handleImageChange} style={{ display: 'none' }} />
        </label>
      )}

      {/* 아이콘 */}
      <div className={style.iconBox}>
        <div className={style.reLoading} onClick={reLoad}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
        </div>

        {/* 성별 선택 */}
        <div className={style.hairDiv}>
          <select className={style.gender} 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            style={{ border: gender !== "" ? "2px solid black" : ''}}
            >
            <option value="" hidden selected>성별</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 헤어 길이 선택 */}
        <div className={style.hairDiv}>
          <select className={style.hairLength} 
            value={hairLength} 
            onChange={(e) => setHairLength(e.target.selectedOptions[0].text)}
            style={{ border: hairLength !== "" ? "2px solid black" : ''}}>
          <option value="" hidden selected>길이</option>
          <option value="롱">롱</option>
          <option value="미디움">미디움</option>
          <option value="쇼트">쇼트</option>
          </select>
        </div>

        {/* 헤어 색상 선택 */}
        <div className={style.hairDiv}>
          <select className={style.hairColor} 
            value={hairColor} 
            onChange={(e) => setHairColor(e.target.selectedOptions[0].text)}
            style={{ border: hairColor !== "" ? "2px solid black" : ''}}>
          <option value="" hidden selected>색상</option>
          <option value="골드브라운">골드브라운</option>
          <option value="그레이">그레이</option>
          <option value="다크브라운">다크브라운</option>
          <option value="레드바이올렛">레드바이올렛</option>
          <option value="레드브라운">레드브라운</option>
          <option value="레드오렌지">레드오렌지</option>
          <option value="레드와인">레드와인</option>
          <option value="매트브라운">매트브라운</option>
          <option value="머쉬룸블론드">머쉬룸블론드</option>
          <option value="밀크브라운">밀크브라운</option>
          <option value="발레아쥬">발레아쥬</option>
          <option value="보라색">보라색</option>
          <option value="브라운">브라운</option>
          <option value="브릿지">브릿지</option>
          <option value="블랙">블랙</option>
          <option value="블론드">블론드</option>
          <option value="블루블랙">블루블랙</option>
          <option value="새치염색">새치염색</option>
          <option value="솜브레">솜브레</option>
          <option value="애쉬그레이">애쉬그레이</option>
          <option value="애쉬바이올렛">애쉬바이올렛</option>
          <option value="애쉬베이지">애쉬베이지</option>
          <option value="애쉬브라운">애쉬브라운</option>
          <option value="애쉬블론드">애쉬블론드</option>
          <option value="애쉬블루">애쉬블루</option>
          <option value="애쉬카키">애쉬카키</option>
          <option value="애쉬카키브라운">애쉬카키브라운</option>
          <option value="애쉬퍼플">애쉬퍼플</option>
          <option value="애쉬핑크">애쉬핑크</option>
          <option value="오렌지브라운">오렌지브라운</option>
          <option value="옴브레">옴브레</option>
          <option value="초코브라운">초코브라운</option>
          <option value="카키">카키</option>
          <option value="카키브라운">카키브라운</option>
          <option value="탈색">탈색</option>
          <option value="투톤">투톤</option>
          <option value="핑크브라운">핑크브라운</option>
          </select>
        </div>
      </div>

      {/* 미용실 입력 */}
      <div className={style.choiceShop}>
        <input id="shop" disabled className={style.shopInput} value={shop} onChange={onChangeShop} type="text" placeholder={shop || '미용실 입력...'} />
        <Link href="post/findShop" className={style.shopBtn}>미용실 찾기</Link>
      </div>

      {/* 헤어이름 입력 */}
      <div className={style.hairNameDiv}>
        <input id="hairName" className={style.hairNameInput} value={hairName} onChange={onChangeHairName} type="text" placeholder="헤어이름 입력..." />
      </div>

      {/* 게시글 내용 작성 */}
      <div className={style.postText}>
        <textarea id="text" className={style.text} value={text} onChange={onChangeText} placeholder="게시글 작성..." />
      </div>

      {/* 게시글 등록 버튼 */}
      <button className={style.postButton} style={isButtonEnabled ? {cursor: "pointer"} : {}} disabled={!isButtonEnabled}>게시글 등록</button>
    </form>
    </>
  )
}