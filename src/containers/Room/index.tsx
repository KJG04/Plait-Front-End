import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { RecoilRoot } from "recoil";
import { RoomSSRProps } from "@pages/[id]";
import { useAfterListening, useListeningRoom } from "@queries/Room";
import {
  Aside,
  BottomBar,
  EmojiEventListener,
  Members,
  Player,
} from "@components";
import * as S from "./styles";

const RoomContainer: NextPage<RoomSSRProps> = (props) => {
  const { id } = props;
  const idleRef = useRef<NodeJS.Timeout | null>(null);
  const { data } = useListeningRoom(id);

  const [afterListening] = useAfterListening();
  const isPivot = useMemo(() => (data ? data.listening : false), [data]);

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
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  useEffect(() => {
    setTimeout(() => {
      afterListening({ variables: { roomCode: id } });
    }, 1000);
  }, [afterListening, id]);

  return (
    <RecoilRoot>
      <S.Container>
        <S.TopContainer>
          <Aside />
          <Player />
        </S.TopContainer>
        <BottomBar />
        <Members />
      </S.Container>
      <EmojiEventListener />
    </RecoilRoot>
  );
};

RoomContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoomContainer;
