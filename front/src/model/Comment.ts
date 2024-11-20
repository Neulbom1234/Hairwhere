import { User } from "./User";

export interface Comment {
  id: number,
  content: string,
  user: User,
  parentId?: number,
  replies: Comment[],
  createdAt: Date
}