"use client";

import style from '@/app/(main)/_component/login.module.css';
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import {signIn} from "next-auth/react";

export default function LoginModal() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [idError, setIdError] = useState<string>('');

  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await signIn("credentials", {
        username: id,
        password,
        redirect: false, //클라이언트 컴포넌트면 서버 redirect는 false로 꺼준다.
      })
      router.back(); //여기서 페이지 이동
    } catch (err) {
      console.error(err);
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };
  const onClickClose = () => {
    router.back();
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value=e.target.value;
    setId(value);
    const list=/[^a-zA-Z0-9]/;
    if(list.test(value)){
      setIdError('영어와 숫자만 입력 가능합니다.');
    } else{
      setIdError('');
    } 
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

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
            {idError && <span className="errorMessage" style={{color: 'red', fontSize: '10px', maxWidth: '340px', display:'block', margin:'4px auto'}}>{idError}</span>}
          </div>
          <div className={style.message}>{message}</div>
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