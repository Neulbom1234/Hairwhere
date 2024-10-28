"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";

// eslint-disable-next-line import/no-anonymous-default-export
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
  if (!formData.get('profile')) { //프로필 입력 안 됨
    return { message: 'no_profile' };
  }
  if (/[^a-zA-Z0-9]/.test(formData.get('loginId') as string)) {  //id에 영어, 숫자를 제외한 값이 들어감
    return { message: 'Only letters and numbers allowed' };
  }
  if (formData.get('pw') !== formData.get('secondPw')) {  //비밀번호 불일치
    return { message: 'Password do not match' };
  }
  if (/[^a-zA-Z0-9@.]/.test(formData.get('email') as string)) { //이메일 형식 안 맞음
    return { message: 'Only letters, numbers, and @ . allowed' };
  }

  // secondPw 필드를 제거
  formData.delete('secondPw');

  // 전송할 데이터 확인
  console.log('Sending FormData contents (after removing secondPw):');
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  let shouldRedirect = false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_SERVER}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Registration failed:', errorData);
      return { message: errorData.message || 'Registration failed' };
    }

    shouldRedirect = true;

    // 로그인 시도
    const signInResult = await signIn("credentials", {
      username: formData.get('loginId'),
      password: formData.get('pw'),
      redirect: false,
    });

    if (signInResult?.error) {
      console.error('Sign in failed:', signInResult.error);
      return { message: 'Registration successful but sign in failed' };
    }

  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect('/');
  }
}
