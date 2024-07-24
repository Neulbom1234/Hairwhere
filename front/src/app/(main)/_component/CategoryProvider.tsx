"use client"

import { createContext, ReactNode, useState } from "react"

type CategoryContextType = {
  category: string;
  setCategory: (value: string) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  category: '전체',
  setCategory: () => {},
});

type Props = { children: ReactNode };

export default function CategoryProvider({children}: Props) {
  const [category, setCategory] = useState('전체');

  return (
    <CategoryContext.Provider value={{category, setCategory}}>
      {children}
    </CategoryContext.Provider>
  )
  
}