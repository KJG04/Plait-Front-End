import atomKeys from "@constant/atomkeys";
import { atom } from "recoil";

const playTimeState = atom<number>({
  key: atomKeys.duration,
  default: 0,
});

export default playTimeState;
