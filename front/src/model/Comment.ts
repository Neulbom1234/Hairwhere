import { User } from "./User";

export interface Comment {
  id: number,
  content: string,
  user: User,
  parent: Comment,
  replies: Comment[],
  createdAt: Date
}