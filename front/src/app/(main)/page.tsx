import style from "@/app/(main)/home.module.css"
import CommonLayout from "./_component/CommonLayout"
import Header from "./_component/Headet";
import CategoryProvider from "./_component/CategoryProvider";
import { Suspense } from "react";
import Loading from "./loading";
import CategoryDeciderSuspense from "./_component/CategoryDeciderSuspense";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className={style.main}>
      <CategoryProvider>
        <Header me={session}/>
        <Suspense fallback={<Loading/>}>
          <CategoryDeciderSuspense/>
        </Suspense>
        <CommonLayout/>
      </CategoryProvider>
    </div>
  )
}