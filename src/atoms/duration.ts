import atomKeys from "@constant/atomkeys";
import { atom } from "recoil";

const durationState = atom<number>({
  key: atomKeys.duration,
  default: 0,
});

export default durationState;
