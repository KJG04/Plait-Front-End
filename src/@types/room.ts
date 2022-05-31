import Content from "./content";
import User from "./user";

export interface Room {
  code: string;
  isPlaying: boolean;
  playTime: number;
  createdAt: string;
  users: User[];
  contents: Content[];
}
