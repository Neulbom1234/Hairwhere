// src/store/store.ts
import { Comment } from '@/model/Comment';
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
  postHairName: string;
  setPostHairName: (postHairName: string) => void;
  text: string;
  setText: (text: string) => void;
  preview: PreviewType[];
  setPreview: (value: PreviewType[] | ((prevState: PreviewType[]) => PreviewType[])) => void;
  imgMax: string;
  setImgMax: (imgMax: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  postGender: string;
  setPostGender: (postGender: string) => void;
  hairLength: string;
  setHairLength: (hairLength: string) => void;
  postHairLength: string;
  setPostHairLength: (postHairLength: string) => void;
  hairColor: string;
  setHairColor: (hairColor: string) => void;
  postHairColor: string;
  setPostHairColor: (postHairColor: string) => void;
  photoId: string|undefined;
  setPhotoId: (photoId: string) => void;
  recomment: Comment|undefined;
  setRecomment: (recomment: Comment) => void;
  name: string|undefined;
  setName: (name: string) => void;
  image: File|null;
  setImage: (image: File) => void;
  selectedKeys: string[];
  setSelectedKeys: (selectedKeys: string[]) => void;
};

export const useStore = create<StoreState>((set) => ({
  shop: '',
  setShop: (shop) => set({ shop }),
  shopAddress: '',
  setShopAddress: (shopAddress) => set({ shopAddress }),
  hairName: '',
  setHairName: (hairName) => set({ hairName }),
  postHairName: '',
  setPostHairName: (postHairName) => set({ postHairName }),
  text: '',
  setText: (text) => set({ text }),
  preview: [],
  setPreview: (value) =>
    set((state) => ({
      preview: typeof value === 'function' ? value(state.preview) : value,
    })),
  imgMax: '',
  setImgMax: (imgMax) => set({ imgMax }),
  gender: "",
  setGender: (gender) => set({ gender }),
  postGender: "",
  setPostGender: (postGender) => set({ postGender }),
  hairLength: "",
  setHairLength: (hairLength) => set({ hairLength }),
  postHairLength: "",
  setPostHairLength: (postHairLength) => set({ postHairLength }),
  hairColor: "",
  setHairColor: (hairColor) => set({ hairColor }),
  postHairColor: "",
  setPostHairColor: (postHairColor) => set({ postHairColor }),
  photoId: undefined,
  setPhotoId: (photoId) => set({ photoId }),
  recomment: undefined,
  setRecomment: (recomment) => set({ recomment }),
  name: undefined,
  setName: (name) => set({ name }),
  image: null,
  setImage: (image) => set({ image }),
  selectedKeys: [],
  setSelectedKeys: (selectedKeys) => set({ selectedKeys})
}));
