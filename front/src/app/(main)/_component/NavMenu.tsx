"use client"

import style from "@/app/(main)/_component/navMenu.module.css"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  console.log(segment);
  const {data: me} = useSession();

  return (
    <>
      <li> {/* 메인페이지 */}
        <Link href="/">
          <div className={style.navPill}>
            {segment && (['search', 'searchResult', 'post', 'notice', 'likes', `${me?.user?.email}`].includes(segment)) ? // segment === ''이 안 되기 때문에 include 사용
              <>
                <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                  <g>
                    <path
                      d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
                  </g>
                </svg>
              </> :
              <>
                <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                  <g>
                    <path
                      d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                  </g>
                </svg>
              </>}
          </div>
        </Link>
      </li>
      <li> {/* 검색페이지 */}
        <Link href="/search">
          <div className={style.navPill}>
            {segment && (['search', 'searchResult'].includes(segment)) ?
              <>
                <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                  <g>
                    <path
                      d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
                  </g>
                </svg>
              </> :
              <>
                <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                  <g>
                    <path
                      d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                  </g>
                </svg>
              </>}
          </div>
        </Link>
      </li>
      <li> {/* 글 작성페이지 */}
        <Link href="/post">
          <div className={style.navPill}>
            {segment === 'post' ? 
            <svg aria-label="새로운 게시물 클릭됨" className="x1lliihq x1n2onr6 x5n08af" fill="black" height={26} role="img" viewBox="0 0 24 24" width={26}>
              <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={2}></path>
              <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width={2} x1={6.545} x2={17.455} y1={12.001} y2={12.001}></line>
              <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width={2} x1={12.003} x2={12.003} y1={6.545} y2={17.455}></line>
            </svg>:
            <svg aria-label="새로운 게시물" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height={26} role="img" viewBox="0 0 24 24" width={26}>
              <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" 
              fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={2}></path>
              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={2} x1={6.545} x2={17.455} y1={12.001} y2={12.001}></line>
              <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={2} x1={12.003} x2={12.003} y1={6.545} y2={17.455}></line>
              </svg>
            }
          </div>
        </Link>
      </li>
      <li> {/* 좋아요페이지 */}
        <Link href="/likes">
          <div className={style.navPill}>
            {segment === 'likes'? 
            <svg aria-label="좋아요" fill="currentColor" role="img" viewBox="0 0 24 24" width={26} height={26}>
              <path d="M17.075 1.987a5.852 5.852 0 0 0-5.07 2.66l-.008.012-.01-.014a5.878 5.878 0 0 0-5.062-2.658A6.719 6.719 0 0 0 .5 8.952c0 3.514 2.581 5.757 5.077 7.927.302.262.607.527.91.797l1.089.973c2.112 1.89 3.149 2.813 3.642 3.133a1.438 1.438 0 0 0 1.564 0c.472-.306 1.334-1.07 3.755-3.234l.978-.874c.314-.28.631-.555.945-.827 2.478-2.15 5.04-4.372 5.04-7.895a6.719 6.719 0 0 0-6.425-6.965Z"></path>
            </svg>
            :
            <svg aria-label="좋아요" fill="currentColor" role="img" viewBox="0 0 24 24" width={26} height={26}>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          }
          </div>
        </Link>
      </li>
      <li> {/*  프로필페이지 */}
        <Link href={`/${me?.user?.email}`}>
          <div className={style.navPill}>
            {segment === me?.user?.email?
            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e" width={26} height={26}>
              <g>
                <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
              </g>
            </svg>:
            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e" width={26} height={26}>
              <g>
                <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
              </g>
            </svg>}
          </div>
        </Link>
      </li>
    </>
  )
}