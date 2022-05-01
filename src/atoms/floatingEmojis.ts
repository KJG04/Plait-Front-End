import { atom } from "recoil";
import atomKeys from "../constant/atomkeys";

export interface FloatingEmojiType {
  x: number;
  y: number;
  emoji: string;
  id: string;
  color: string;
  name: string;
}

const initalState: FloatingEmojiType[] = [];

const floatingEmojisState = atom({
  key: atomKeys.floatingEmoji,
  default: initalState,
});

export default floatingEmojisState;
