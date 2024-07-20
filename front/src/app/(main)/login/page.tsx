import LoginModal from "../_component/LoginModal";
import {auth} from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth(); //useSession의 서버 컴포넌트 버전
  if (session?.user) {
    redirect('/');
    return null;
  }
  return (
    <div>
      <LoginModal/>
    </div>
  )
}