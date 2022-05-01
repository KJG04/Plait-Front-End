import { atom } from "recoil";
import atomKeys from "../constant/atomkeys";

const initalState: string[] = [];

const usedEmojiState = atom<string[]>({
  key: atomKeys.usedEmoji,
  default: initalState,
});

export default usedEmojiState;
