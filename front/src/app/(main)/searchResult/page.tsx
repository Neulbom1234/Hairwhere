"use client"

import style from "@/app/(main)/searchResult/searchResult.module.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import SearchHeader from '../_component/SearchHeader';
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { q: string, f?: string, pf?: string };
}

export default function Page({searchParams}: Props) {
  const router = useRouter();

    return (
      <>
        <SearchHeader q={searchParams.q}/>
        <div className={style.postsWrapper}>
          <SearchResult searchParams={searchParams}/>
        </div>
      </>
    )
  }