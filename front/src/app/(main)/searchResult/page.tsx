"use client"

import style from "@/app/(main)/searchResult/searchResult.module.css";
import { useRouter } from 'next/navigation';
import SearchHeader from '../_component/SearchHeader';
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { hairName: string, gender: string, hairLength: string, hairColor: string };
}

export default function Page({searchParams}: Props) {
  const router = useRouter();

    return (
      <>
        <SearchHeader/>
        <div className={style.postsWrapper}>
          <SearchResult searchParams={searchParams}/>
        </div>
      </>
    )
  }