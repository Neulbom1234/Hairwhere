import { Post } from "./Post"

export interface PageInfo {
  content: Post[],
  number: number,
  last: boolean 
}