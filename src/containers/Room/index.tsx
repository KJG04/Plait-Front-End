import { NextPage } from "next";
import { useCallback, useEffect, useRef } from "react";
import Aside from "../../components/Aside";
import BottomBar from "../../components/BottomBar";
import Members from "../../components/Members";
import Player from "../../components/Player";
import * as S from "./styles";

const RoomContainer: NextPage = () => {
  const idleRef = useRef<NodeJS.Timeout | null>(null);

  const idle = useCallback(() => {
    document.body.style.cursor = "none";
  }, []);

  const onMouseMove = useCallback(() => {
    if (idleRef.current) {
      clearTimeout(idleRef.current);
      document.body.style.cursor = "unset";
    }

    idleRef.current = setTimeout(idle, 1500);
  }, [idle]);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <S.Container>
      <S.TopContainer>
        <Aside />
        <Player />
      </S.TopContainer>
      <BottomBar />
      <Members />
    </S.Container>
  );
};

export default RoomContainer;
