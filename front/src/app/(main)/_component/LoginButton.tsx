"use client"

import style from './header.module.css';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  };

  const onLogout = () => {
    signOut({redirect: false})
      .then(() => {
        deleteCookie('JSESSIONID');
        router.push("/");
      })
  }

  if (status === "loading") {
    return null;
  }

  return (
    <>
      {session?
        // 아래 notice 코드는 추후 추가 예정

        // <Link href="/notice">
        //   {segment === 'notice' ?
        //   <>
        //     <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e" width={26} height={26}>
        //       <g>
        //         <path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path>
        //       </g>
        //     </svg>
        //   </> :
        //   <>
        //     <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e" width={26} height={26}>
        //       <g>
        //         <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
        //       </g>
        //     </svg>
        //   </>
        //   }
        // </Link>
        <button className={style.loginButton} onClick={onLogout}>로그아웃</button>
      :
      <Link href="/login" className={style.loginButton}>로그인</Link>
      }
    </>
  )
}