"use server";

import {redirect} from "next/navigation";
import {signIn} from "@/auth";

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('loginId') || !(formData.get('loginId') as string)?.trim()) { //id 입력 안 됨
    return { message: 'no_id' };
  }
  if (!formData.get('pw') || !(formData.get('pw') as string)?.trim()) { //비밀번호 입력 안 됨
    return { message: 'no_password' };
  }
  if (!formData.get('secondPw') || !(formData.get('secondPw') as string)?.trim()) { //비밀번호 확인 입력 안 됨
    return { message: 'no_secondPassword' };
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) { //닉네임 입력 안 됨
    return { message: 'no_name' };
  }
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {  //이메일 입력 안 됨
    return { message: 'no_email' };
  }
  if (/[^a-zA-Z0-9]/.test(formData.get('loginId') as string)) {  //id에 영어, 숫자를 제외한 값이 들어감
    return { message: 'Only letters and numbers allowed'};
  }
  if (formData.get('pw') !== formData.get('secondPw')) {  //비밀번호 불일치
    return { message: 'Password do not match'};
  }
  if (/[^a-zA-Z0-9@.]/.test(formData.get('email') as string)) { //이메일 형식 안 맞음
    return { message: 'Only letters, numbers, and @ . allowed'};
  }
  const newFormData = new FormData();
  formData.forEach((value, key) => {
    if (key !== 'secondPw') {
      newFormData.append(key, value);
    }
  });
  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.BACKEND_API_SERVER}/register`, {
      method: 'post',
      body: newFormData,
      credentials: 'include',
    })
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json())
    shouldRedirect = true;
    await signIn("credentials", { //회원가입 후 로그인까지 바로 하기
      username: formData.get('loginId'),
      password: formData.get('pw'),
      redirect: false,
    })
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect('/'); // try/catch문 안에서 X
  }
}
