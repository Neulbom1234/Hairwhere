"use client";

import style from './signup.module.css';
import {useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";

export default function SignupModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [idError, setIdError] = useState('');
  const [pwCheck, setPWCheck] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [image, setImage] = useState('');
  // const [imageFile, setImageFile] = useState<File>();


  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

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
    setPassword(e.target.value)
   };
  const onChangeSecondPassword: ChangeEventHandler<HTMLInputElement> = (e) => { 
    // 1차 비밀번호랑 같은지 확인하기 구현해야 함
    const value=e.target.value;
    setSecondPassword(e.target.value)
    if(password===value){
      setPWCheck('비밀번호가 일치합니다');
    } else{
      setPWCheck('비밀번호가 일치하지 않습니다');
    }
   };

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => { 
    const value=e.target.value;
    setEmail(value);
    const list=/[^a-zA-Z0-9@.]/;
    if(list.test(value)){
      setEmailError('영어와 숫자 및 특수문자(@ .)만 입력 가능합니다.');
    } else{
      setEmailError('');
    }
   };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => { setNickname(e.target.value) };

  // const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   e.target.files && setImageFile(e.target.files[0])
  // };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/api/users', {
      method: 'post',
      body: JSON.stringify({
        id,
        email,
        // image,
        password,
      }),
      credentials: 'include',
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 200) {
        router.replace('/home');
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
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
            <div className={style.signIn}>회원가입</div>
          </div>
          <form>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" className={style.input} type="text" placeholder=""
                       value={id}
                       onChange={onChangeId}
                />
                {idError && <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>{idError}</span>}
              </div>

              {/* 비밀번호 */}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" className={style.input} type="password" placeholder=""
                       value={password}
                       onChange={onChangePassword}
                />
              </div>
              {/* 비밀번호(재입력) => 입력창만 만들었음 !*/}
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="secondPassword">비밀번호 재입력</label>
                <input id="secondPassword" className={style.input} type="password" placeholder=""
                       value={secondPassword}
                       onChange={onChangeSecondPassword} 
                />
                {pwCheck && <span className="errorMessage" style={{color: 'red', fontSize:'10px'}}>{pwCheck}</span>}
              </div>

              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="email">이메일</label>
                <input id="email" className={style.input} type="email" placeholder=""
                       value={email} 
                       onChange={onChangeEmail}
                />
                {emailError && <span className="errorMessage" style={{color: 'red', fontSize: '10px'}}>{emailError}</span>}
              </div>


              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="nickname">닉네임</label>
                <input id="nickname" className={style.input} type="text" placeholder=""
                       value={nickname}
                       onChange={onChangeNickname}
                />
              </div>

              <div className={style.inputDiv}>
                <select className={style.gender}>
                  <option value="0" disabled>성별</option>
                  <option value="1">남자</option>
                  <option value="2">여자</option>
                </select>
              </div>
              
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton} disabled>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}