// src/store/store.ts
import {create} from 'zustand';

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
};

export const useStore = create<StoreState>((set) => ({
  shop: '',
  setShop: (shop) => set({ shop }),
  shopAddress: '',
  setShopAddress: (shopAddress) => set({ shopAddress }),
  hairName: '',
  setHairName: (hairName) => set({ hairName }),
  text: '',
  setText: (text) => set({ text }),
  preview: [],
  setPreview: (value) =>
    set((state) => ({
      preview: typeof value === 'function' ? value(state.preview) : value,
    })),
  imgMax: '',
  setImgMax: (imgMax) => set({ imgMax }),
  gender: "0",
  setGender: (gender) => set({ gender }),
  hairLength: "0",
  setHairLength: (hairLength) => set({ hairLength }),
  hairColor: "0",
  setHairColor: (hairColor) => set({ hairColor }),
}));
