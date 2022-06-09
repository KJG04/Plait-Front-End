import { Content, User } from "@types";

export interface Room {
  code: string;
  isPlaying: boolean;
  playTime: number;
  createdAt: string;
  users: User[];
  contents: Content[];
}
