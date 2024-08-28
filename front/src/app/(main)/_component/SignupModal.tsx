"use client";

import style from './signup.module.css';
import onSubmit from "../_lib/signup"
import { useFormState, useFormStatus } from 'react-dom';
import BackButton from './BackButton';

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus(); //pending은 데이터를 보내고 있는 중

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton/>
            <div className={style.signIn}>회원가입</div>
          </div>
          <form action={formAction}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="loginId">아이디</label>
                <input id="loginId" name="loginId" className={style.input} type="text" placeholder=""
                       required
                />
                {state?.message === 'Only letters and numbers allowed' &&
                  <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>영어와 숫자만 입력 가능합니다.</span>
                }
              </div>

              {/* 비밀번호 */}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="pw">비밀번호</label>
                <input id="pw" name="pw" className={style.input} type="password" placeholder=""
                       required
                />
              </div>
              {/* 비밀번호(재입력) => 입력창만 만들었음 !*/}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="secondPw">비밀번호 재입력</label>
                <input id="secondPw" name="secondPw" className={style.input} type="password" placeholder=""
                       required
                />
                {state?.message === 'Password do not match' &&
                  <span className="errorMessage" style={{color: 'red', fontSize:'10px'}}>비밀번호가 일치하지 않습니다</span>
                }
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="email">이메일</label>
                <input id="email" name="email" className={style.input} type="email" placeholder=""
                       required
                />
                {state?.message === 'Only letters, numbers, and @ . allowed' &&
                  <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>영어와 숫자 및 특수문자(@ .)만 입력 가능합니다.</span>
                }
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" name="name" className={style.input} type="text" placeholder=""
                       required
                />
                {state?.message === 'no_name' &&
                  <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>닉네임을 입력해야 합니다.</span>
                }
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="profile">프로필</label>
                <input id="profile" name="profile" required className={style.input} type="file" accept="image/*"
                />
                {state?.message === 'no_profile' &&
                  <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>프로필 사진을 업로드 해야 합니다.</span>
                }
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton} disabled={pending}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}