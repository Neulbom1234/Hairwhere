"use client"

import style from './header.module.css';
import LoginButton from './LoginButton';

export default function Header() {

  return (
    <>
      <div className={style.header}>
        <div className={style.logo}>
          <span style={{fontWeight: "bold"}}>Logo</span>
        </div>
        <LoginButton/>
      </div>
    </>
  )
}