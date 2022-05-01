import { atom } from "recoil";
import atomKeys from "../constant/atomkeys";

export interface FloatingEmojiType {
  xPercent: number;
  yPercent: number;
  emoji: string;
  id: string;
}

const initalState: FloatingEmojiType[] = [];

const floatingEmojisState = atom({
  key: atomKeys.floatingEmoji,
  default: initalState,
});

export default floatingEmojisState;
