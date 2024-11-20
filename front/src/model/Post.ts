import { User } from "./User";

export interface Post {
  user: User;
  id: number;
  userName: string;
  userProfilePath: string;
  photoImagePath: string[];
  likedUserNames: string[];
  likeCount:number;
  hairName: string;
  text: string;
  gender: string;
  created: Date;
  hairSalon: string;
  hairSalonAddress: string;
  hairLength: string;
  hairColor:string;
}