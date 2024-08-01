"use client"

import style from './searchHeader.module.css';
import { useState, ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HairCategoryMenu from './HairCategoryMenu';

type Props = { q?: string };

export default function SearchHeader({q}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryVisible, setCategoryVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(!searchQuery && q) {
      setSearchQuery(q);
    }
  }, [q])

  const onChangeSearchQuery: ChangeEventHandler<HTMLInputElement> = (e) => { setSearchQuery(e.target.value) };

  const toggleVisible = () => {
    setCategoryVisible(!categoryVisible);
  }

  const redirectToPage = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 방지
    if (searchQuery.trim() !== '') {
      router.push(`/searchResult?q=${searchQuery}`);
    }
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.categoryButton} onClick={toggleVisible}>
          <svg width={22} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2 2.3C10.2 3.29411 9.39411 4.1 8.4 4.1C7.40589 4.1 6.6 3.29411 6.6 2.3M10.2 2.3C10.2 1.30589 9.39411 0.5 8.4 0.5C7.40589 0.5 6.6 1.30589 6.6 2.3M10.2 2.3H12M6.6 2.3H0M5.4 6.5C5.4 7.49411 4.59411 8.3 3.6 8.3C2.60589 8.3 1.8 7.49411 1.8 6.5M5.4 6.5C5.4 5.50589 4.59411 4.7 3.6 4.7C2.60589 4.7 1.8 5.50589 1.8 6.5M5.4 6.5H12M1.8 6.5H0M10.2 10.7C10.2 11.6941 9.39411 12.5 8.4 12.5C7.40589 12.5 6.6 11.6941 6.6 10.7M10.2 10.7C10.2 9.70589 9.39411 8.9 8.4 8.9C7.40589 8.9 6.6 9.70589 6.6 10.7M10.2 10.7H12M6.6 10.7H0" stroke="#6e6e6e"></path>
          </svg>
        </div>
        <section className={`${style.hairCategory} ${categoryVisible ? style.visible : ''}`}>
          <div className={style.hairCategoryFooter}>
            <span>필터</span>
            <button className={style.closeButton} onClick={toggleVisible}>
              <svg width={22} viewBox="0 0 24 24" aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
          </button>
          </div>
          <HairCategoryMenu/>
        </section>
        <form>
          <div className={style.inputDiv}>
            <input className={style.input} name="search" type="search" placeholder="헤어명을 입력하세요"
              value={searchQuery}
              onChange={onChangeSearchQuery}
            />
            <button className={style.searchButton} onClick={redirectToPage}>
              <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                <g>
                  <path
                    d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}