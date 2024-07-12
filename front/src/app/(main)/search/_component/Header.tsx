"use client"

import style from './header.module.css';
import { useState, ChangeEventHandler } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onChangeSearchQuery: ChangeEventHandler<HTMLInputElement> = (e) => { setSearchQuery(e.target.value) };

  return (
    <>
      <div className={style.header}>
        <div className={style.categoryButton}>
          <svg width={26} height={26} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2 2.3C10.2 3.29411 9.39411 4.1 8.4 4.1C7.40589 4.1 6.6 3.29411 6.6 2.3M10.2 2.3C10.2 1.30589 9.39411 0.5 8.4 0.5C7.40589 0.5 6.6 1.30589 6.6 2.3M10.2 2.3H12M6.6 2.3H0M5.4 6.5C5.4 7.49411 4.59411 8.3 3.6 8.3C2.60589 8.3 1.8 7.49411 1.8 6.5M5.4 6.5C5.4 5.50589 4.59411 4.7 3.6 4.7C2.60589 4.7 1.8 5.50589 1.8 6.5M5.4 6.5H12M1.8 6.5H0M10.2 10.7C10.2 11.6941 9.39411 12.5 8.4 12.5C7.40589 12.5 6.6 11.6941 6.6 10.7M10.2 10.7C10.2 9.70589 9.39411 8.9 8.4 8.9C7.40589 8.9 6.6 9.70589 6.6 10.7M10.2 10.7H12M6.6 10.7H0" stroke="#6e6e6e"></path>
          </svg>
        </div>
        <form>
          <div className={style.inputDiv}>
            <input id="searchQuery" className={style.input} type="text" placeholder="헤어명을 입력하세요"
              value={searchQuery}
              onChange={onChangeSearchQuery}
            />
          </div>
        </form>
      </div>
    </>
  )
}