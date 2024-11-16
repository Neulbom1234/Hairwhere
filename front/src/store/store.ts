import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreviewType = {
  dataUrl: string;
  file: File;
};

type StoreState = {
  shop: string;
  setShop: (shop: string) => void;
  shopAddress: string;
  setShopAddress: (shopAddress: string) => void;
  hairName: string;
  setHairName: (hairName: string) => void;
  text: string;
  setText: (text: string) => void;
  preview: PreviewType[];
  setPreview: (value: PreviewType[] | ((prevState: PreviewType[]) => PreviewType[])) => void;
  imgMax: string;
  setImgMax: (imgMax: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  hairLength: string;
  setHairLength: (hairLength: string) => void;
  hairColor: string;
  setHairColor: (hairColor: string) => void;
  name: string;
  setName: (name: string) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      shop: "",
      setShop: (shop) => set({ shop }),
      shopAddress: "",
      setShopAddress: (shopAddress) => set({ shopAddress }),
      hairName: "",
      setHairName: (hairName) => set({ hairName }),
      text: "",
      setText: (text) => set({ text }),
      preview: [],
      setPreview: (value) =>
        set((state) => ({
          preview: typeof value === "function" ? value(state.preview) : value,
        })),
      imgMax: "",
      setImgMax: (imgMax) => set({ imgMax }),
      gender: "",
      setGender: (gender) => set({ gender }),
      hairLength: "",
      setHairLength: (hairLength) => set({ hairLength }),
      hairColor: "",
      setHairColor: (hairColor) => set({ hairColor }),
      name: "",
      setName: (name) => set({ name }),
    }),
    {
      name: "user-store", // localStorage에 저장될 키 이름
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // string에서 객체로 변환
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value)); // 객체를 string으로 변환하여 저장
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    }
  )
);

// Custom hook to sync session with Zustand store
export function useSyncNameFromSession() {
  const { data: session } = useSession();
  const setName = useStore((state) => state.setName);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name); // session에서 이름을 가져와 zustand 상태 업데이트
    }
  }, [session, setName]); // session이 변경될 때마다 실행
}
