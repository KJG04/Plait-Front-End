import { useContext } from "react";
import { roomContext } from "@contexts";

const useRoomContext = () => useContext(roomContext);

export default useRoomContext;
