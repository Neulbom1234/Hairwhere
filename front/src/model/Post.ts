import { HairCategory } from "./HairCategory";
import { HairInfo } from "./HairInfo";
import { PostImage } from "./PostImage";
import { User } from "./User";

export interface Post {
<<<<<<< HEAD
  
  id: number;
  userName: string;
  photoImagePath: string[];
  likeCount: number; 
=======
  User: User;
  id: number;
  userName: string;
  photoImagePath: string[];
  likeCount:number;
>>>>>>> 5f21712 ([fix] 남성, 여성 게시글 조회 API 연결)
  hairName: string;
  text: string;
  gender: string;
  created: Date;
  hairSalon: string;
  hairSalonAddress: string;
  hairLength: string;
<<<<<<< HEAD
  hairColor: string;  
=======
  hairColor:string;
 
>>>>>>> 5f21712 ([fix] 남성, 여성 게시글 조회 API 연결)
}