"use client"

import style from './header.module.css';
import { useRef } from 'react';
import { useRouter } from 'next/navigation'

type Props = {
  salonName: string;
}

export default function Header({salonName}: Props) {
  const decodedSalonName = decodeURIComponent(salonName);
  const textRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  // 미용실 이름 아래 주소 넣을 시 아래 코드 추가
  // const copyToClipboard = () => {
  //   if (textRef.current) {
  //     navigator.clipboard.writeText(textRef.current.innerText)
  //       .then(() => {
  //         alert('주소가 클립보드에 복사되었습니다.');
  //       })
  //       .catch((err) => {
  //         console.error('복사 중 에러 발생:', err);
  //       });
  //   }
  // };

  const onClickBack = () => {
    router.back();
  }

  return (
    <>
      <div className={style.header}>
        <button className={style.backButton} onClick={onClickBack}>
          <svg aria-label="돌아가기" width={24} role="img" viewBox="0 0 24 24">
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z" transform="rotate(270 12 12)"></path>
          </svg>
        </button>
        <div className={style.hairSalonWrapper}>
          <span className={style.hairSalon}>{decodedSalonName}</span>
          {/* <span className={style.hairSalonAddress} ref={textRef} onClick={copyToClipboard}>{hairInfo.hairSalonAddress}</span> */}
        </div>
      </div>
    </>
  )
}