import {ReactNode} from "react";
import Header from "./_component/Header";

type Prop = {children: ReactNode};

export default function SearchLayout({children}: Prop) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}