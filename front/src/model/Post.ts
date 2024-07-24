import { HairCategory } from "./HairCategory";
import { HairInfo } from "./HairInfo";
import { PostImage } from "./PostImage";
import { User } from "./User";

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  Likes: string[]; 
  HairInfo: HairInfo;
  HairCategory: HairCategory;
}