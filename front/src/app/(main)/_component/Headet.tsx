"use client"

import style from './header.module.css';
import LoginButton from './LoginButton';

export default function Header() {

  return (
    <>
      <div className={style.header}>
        <div className={style.logo}>
          <img src='/logo.svg' alt='logo'/>
        </div>
        <LoginButton/>
      </div>
    </>
  )
}