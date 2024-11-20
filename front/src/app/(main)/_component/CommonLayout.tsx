"use client"

import style from './commonLayout.module.css';
import { useState } from 'react';


export default function CommonLayout() {
  const [category, setCategory] = useState('전체');
  const [isAllCategoryVisible, setAllCategoryVisible] = useState(true);

  const openAllCategoryClick = () => {
    setAllCategoryVisible(false);
    console.log('바뀜');
  };

  const closeAllCategoryClick = () => {
    setAllCategoryVisible(true);
    console.log('바뀜');
  };

  const changeManCategory = () => {
    category !== '남성' ? setCategory('남성') : setCategory('전체');
    closeAllCategoryClick();
  }

  const changeWomenCategory = () => {
    category !== '여성' ? setCategory('여성') : setCategory('전체');
    closeAllCategoryClick();
  }

  const commonLayoutHeight = {
    height: isAllCategoryVisible ? '40px' : '96px'
  }

  return (
    <>
      <div className={style.commonLayout} style={commonLayoutHeight}>
        <button type="button" className={isAllCategoryVisible ? style.allCategory : style.noneCategory}
          onClick={openAllCategoryClick}>
          <span>{category}</span>
        </button>
        <button type="button" className={style.manCategory} onClick={changeManCategory} 
          style={{backgroundColor: category === '남성' ? 'black' : 'white' }}>
          <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M2.52737 2.52742L11.4717 11.4718M11.4717 2.52734L2.52734 11.4717" stroke="white"></path>
          </svg>
          <span style={{color: category === '남성' ? 'white' : 'rgb(110, 110, 110)'}}>남성</span>
        </button>
        <button type="button" className={style.womenCategory} onClick={changeWomenCategory}
          style={{backgroundColor: category === '여성' ? 'black' : 'white' }}>
          <span style={{color: category === '여성' ? 'white' : 'rgb(110, 110, 110)'}}>여성</span>
          <svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" role="img">
            <path d="M2.52737 2.52742L11.4717 11.4718M11.4717 2.52734L2.52734 11.4717" stroke="white"></path>
          </svg>
        </button>
      </div>
    </>
  )
}