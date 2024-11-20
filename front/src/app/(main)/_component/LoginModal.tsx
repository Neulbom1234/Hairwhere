"use client";

import style from '@/app/(main)/_component/login.module.css';
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from 'next/link';

export default function LoginModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const router = useRouter();
  const onSubmit = () => {};
  const onClickClose = () => {
    router.back();
  };

  const onChangeId = () => {};

  const onChangePassword = () => {};

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg width={30} viewBox="0 0 24 24" aria-hidden="true"
                 className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
              <g>
                <path
                  d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div className={style.login}>로그인</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.loginLogo}>LOGO</div>
            <div className={style.inputDiv}>
              <input id="id" className={style.topInput} value={id} onChange={onChangeId} type="text" placeholder="아이디"/>
            </div>
            <div className={style.inputDiv}>
              <input id="password" className={style.bottomInput} value={password} onChange={onChangePassword} type="password" placeholder="비밀번호"/>
            </div>
            <div className={style.message}>{message}</div>
          </div>
          
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>로그인</button>

            <div className={style.user}>
              <Link href="/signup">회원가입</Link>
              <div className={style.stick}></div>
              <Link href="/searchID">아이디 찾기</Link>
              <div className={style.stick}></div>
              <Link href="/searchPW">비밀번호 찾기</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}