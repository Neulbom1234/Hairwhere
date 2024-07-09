"use client"

import style from './commonLayout.module.css';


export default function CommonLayout() {
  return (
    <>
      <div className={style.commonLayout}>
        {/* <button type="button" className={style.allCategory}>
          <span>전체</span>
        </button> */}
        <button type="button" className={style.manCategory}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M2.52737 2.52742L11.4717 11.4718M11.4717 2.52734L2.52734 11.4717" stroke="white"></path>
          </svg>
          <span>남성</span>
        </button>
        <button type="button" className={style.womenCategory}>
          <span>여성</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M2.52737 2.52742L11.4717 11.4718M11.4717 2.52734L2.52734 11.4717" stroke="white"></path>
          </svg>
        </button>
      </div>
    </>
  )
}