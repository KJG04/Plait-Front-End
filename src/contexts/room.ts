import { Room } from "@types";
import { createContext } from "react";

const roomContext = createContext<Room>({
  code: "",
  contents: [],
  createdAt: "",
  isPlaying: false,
  playTime: 0,
  users: [],
});

export default roomContext;
