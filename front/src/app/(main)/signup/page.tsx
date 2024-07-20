import SignupModal from "../_component/SignupModal"
import {auth} from "@/auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth(); //useSession의 서버 컴포넌트 버전
  if (session?.user) {
    redirect('/');
    return null;
  }
  return (
    <>
      <SignupModal/>
    </>
  )
}