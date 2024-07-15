import Post from '../../_component/Post';
import style from './salonPage.module.css';
import Header from './_component/Header';

export default function Page() {
  return (
    <>
      <div className={style.main}>
        <Header/>
        <div className={style.postsWrapper}>
          <Post/>
        </div>
      </div>
    </>
  )
} 