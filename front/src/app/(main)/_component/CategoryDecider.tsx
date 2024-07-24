"use client"

import { useContext } from "react";
import { CategoryContext } from "./CategoryProvider";
import PostRecommends from "./PostRecommends";
import ManPosts from "./ManPosts";
import WomenPosts from "./WomenPosts";

export default function CategoryDecider() {
  const {category} = useContext(CategoryContext);
  if (category === '전체') {
    return <PostRecommends/>
  } else if (category === '남성') {
    return <ManPosts/>
  } else if (category === '여성') {
    return <WomenPosts/>
  }
}