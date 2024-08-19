import {ReactNode} from "react";
import style from "@/app/(main)/layout.module.css";
import NavMenu from "./_component/NavMenu";
import RQProvider from "./_component/RQRovider";
import { auth } from "@/auth";

type Props = { children: ReactNode, modal: ReactNode };
export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  return (
    <div className={style.container}>
      <RQProvider>
        <main className={style.main}>
          {children}
        </main>
        <div className={style.bottomSectionWrapper}>
          <nav className={style.nav}>
            <NavMenu/>
          </nav>
        </div>
        {modal}
      </RQProvider>
    </div>
  )
}