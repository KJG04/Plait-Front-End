import { Room } from "@types";
import { createContext } from "react";

const roomContext = createContext<Room | null>(null);

export default roomContext;
