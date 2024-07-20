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
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" name="id" className={style.input} type="text" placeholder=""
                       required
                />
                {state?.message === 'Only letters and numbers allowed' &&
                  <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>영어와 숫자만 입력 가능합니다.</span>
                }
              </div>

              {/* 비밀번호 */}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" name="password" className={style.input} type="password" placeholder=""
                       required
                />
              </div>
              {/* 비밀번호(재입력) => 입력창만 만들었음 !*/}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="secondPassword">비밀번호 재입력</label>
                <input id="secondPassword" name="secondPassword" className={style.input} type="password" placeholder=""
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
                <label className={style.inputLabel} htmlFor="nickname">닉네임</label>
                <input id="nickname" name="nickname" className={style.input} type="text" placeholder=""
                       required
                />
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