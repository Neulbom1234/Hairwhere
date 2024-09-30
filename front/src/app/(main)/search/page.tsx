"use client"

import style from "@/app/(main)/search/search.module.css"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import SearchHeader from '../_component/SearchHeader';

export default function Search() {
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [hairLength, setHairLength] = useState<string>('');
  const [hairColor, setHairColor] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setSearchKeywords(['리프펌', '가르마펌', '허쉬컷']);
  }, []);

  const onAllDelete = () => {
    setSearchKeywords([]);
  }

  const onDelete = (index: number) => {
    const updateKeywords = [...searchKeywords];
    updateKeywords.splice(index, 1);
    setSearchKeywords(updateKeywords);
  }

  const redirectToPage = (searchedKeyword: string) => {
    router.push(`/searchResult?hairName=${searchedKeyword}&gender=''&hairLength=''&hairColor=''`);
  };

    return (
      <>
        <SearchHeader
          categoryVisible={categoryVisible}
          setCategoryVisible={setCategoryVisible}
          gender={gender}
          setGender={setGender}
          hairLength={hairLength}
          setHairLength={setHairLength}
          hairColor={hairColor}
          setHairColor={setHairColor}
        />
        <div className={style.header}>
          <h2 className={style.recentSearch}>최근 검색어</h2>
          <span className={style.allClear} onClick={onAllDelete}>전체 삭제</span>
        </div>
          {searchKeywords.map((v, index) => (
            <>
              <div className={style.body}>
                <div onClick={() => redirectToPage(v)}>{v}</div>
                <span onClick={() => onDelete(index)}>
                  <svg width={16} viewBox="0 0 24 24" aria-hidden="true"
                      className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                    <g>
                      <path
                        d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                    </g>
                  </svg>
                </span>
              </div>
            </>
          ))}
      </>
    )
  }