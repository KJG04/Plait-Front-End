import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { RecoilRoot } from "recoil";
import { RoomSSRProps } from "@pages/[id]";
import {
  Aside,
  BottomBar,
  EmojiEventListener,
  Members,
  Player,
} from "@components";
import * as S from "./styles";
import { useQuery } from "@apollo/react-hooks";
import { getRoomQuery } from "@queries";
import { roomContext } from "@contexts";

const RoomContainer: NextPage<RoomSSRProps> = (props) => {
  const { id, room } = props;
  const idleRef = useRef<NodeJS.Timeout | null>(null);
  const { data } = useQuery(getRoomQuery, {
    variables: { roomCode: id },
    pollInterval: 1000 * 60,
  });
  const contextValue = useMemo(() => data || room, [data, room]);

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

  return (
    <RecoilRoot>
      <roomContext.Provider value={contextValue}>
        <S.Container>
          <S.TopContainer>
            <Aside />
            <Player />
          </S.TopContainer>
          <BottomBar />
          <Members />
        </S.Container>
        <EmojiEventListener />
      </roomContext.Provider>
    </RecoilRoot>
  );
};

RoomContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoomContainer;
