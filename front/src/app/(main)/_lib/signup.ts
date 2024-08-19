"use server";

import {redirect} from "next/navigation";
import {signIn} from "@/auth";

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) { //id 입력 안 됨
    return { message: 'no_id' };
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) { //비밀번호 입력 안 됨
    return { message: 'no_password' };
  }
  if (!formData.get('secondPassword') || !(formData.get('secondPassword') as string)?.trim()) { //비밀번호 확인 입력 안 됨
    return { message: 'no_secondPassword' };
  }
  if (!formData.get('nickname') || !(formData.get('nickname') as string)?.trim()) { //닉네임 입력 안 됨
    return { message: 'no_name' };
  }
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {  //이메일 입력 안 됨
    return { message: 'no_email' };
  }
  if (/[^a-zA-Z0-9]/.test(formData.get('id') as string)) {  //id에 영어, 숫자를 제외한 값이 들어감
    return { message: 'Only letters and numbers allowed'};
  }
  if (formData.get('password') !== formData.get('secondPassword')) {  //비밀번호 불일치
    return { message: 'Password do not match'};
  }
  if (/[^a-zA-Z0-9@.]/.test(formData.get('email') as string)) { //이메일 형식 안 맞음
    return { message: 'Only letters, numbers, and @ . allowed'};
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.BACKEND_API_SERVER}/register`, {
      method: 'post',
      body: formData,
      credentials: 'include',
    })
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json())
    shouldRedirect = true;
    await signIn("credentials", { //회원가입 후 로그인까지 바로 하기
      username: formData.get('id'),
      password: formData.get('password'),
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
