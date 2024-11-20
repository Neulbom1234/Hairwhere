import style from "@/app/(main)/home.module.css"
import Post from "./_component/Post"
import CommonLayout from "./_component/CommonLayout"
import Header from "./_component/Headet";

export default function Home() {

  const me = false;

  return (
    <div className={style.main}>
      <Header me={me}/>
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