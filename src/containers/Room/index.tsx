import { NextPage } from "next";
import { useCallback, useEffect, useRef } from "react";
import Aside from "../../components/Aside";
import BottomBar from "../../components/BottomBar";
import EmojiEventListener from "../../components/EmojiEventListener";
import Members from "../../components/Members";
import Player from "../../components/Player";
import * as S from "./styles";
import PropTypes from "prop-types";
import { RoomSSRProps } from "../../../pages/[id]";

const RoomContainer: NextPage<RoomSSRProps> = (props) => {
  const { id } = props;
  const idleRef = useRef<NodeJS.Timeout | null>(null);

  const idle = useCallback(() => {
    document.body.style.cursor = "none";
  }, []);

  const onMouseMove = useCallback(() => {
    if (idleRef.current) {
      clearTimeout(idleRef.current);
      document.body.style.cursor = "default";
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
    <>
      <S.Container>
        <S.TopContainer>
          <Aside />
          <Player />
        </S.TopContainer>
        <BottomBar />
        <Members />
      </S.Container>
      <EmojiEventListener />
    </>
  );
};

RoomContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoomContainer;
