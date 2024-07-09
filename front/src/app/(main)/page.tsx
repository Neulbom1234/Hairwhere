import style from "@/app/(main)/home.module.css"
import Link from "next/link"
import Post from "./_component/Post"
import CommonLayout from "./_component/CommonLayout"

export default function Home() {
    return (
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.logo}>
            <span style={{fontWeight: "bold"}}>Logo</span>
          </div>
          <Link href="/login" className={style.loginButton}>로그인</Link>
        </div>
        <div className={style.postsWrapper}>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </div>
        <CommonLayout/>
      </div>
    )
  }