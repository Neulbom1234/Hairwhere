"use client"

import SeeMore from './SeeMore';
import style from './header.module.css'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter();

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
        <div className={style.seemore}>
          <SeeMore/>  
        </div> 
      </div>
    </>
  )
}