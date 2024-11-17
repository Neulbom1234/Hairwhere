import { Avatar } from 'antd';
import style from './comment.module.css';
import { UserOutlined } from '@ant-design/icons';

export default function Comment() {
  return (
    <div className={style.comment}>
      <Avatar icon={<UserOutlined/>} className={style.profile} size={42}/>
      <div className={style.textWrapper}>
        <div className={style.userName}>산호초</div>
        <div className={style.text}>
          우와 너무 예뻐요!!!
        </div>
        <div className={style.commentBottom}>
          <span className={style.time}>6시간 전</span>
          <span className={style.recomment}>답글 10개 보기</span>
        </div>
      </div>
    </div>
  )
}