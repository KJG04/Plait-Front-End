import { NextPage } from "next";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
import { useAlive, usePlayTime, useRoom, useRoomSubscription } from "@queries";
import { roomContext } from "@contexts";
import Head from "next/head";
import { forcePlayTimeVar, playTimeVar } from "@stores";

const RoomContainer: NextPage<RoomSSRProps> = (props) => {
  const { id, room } = props;
  const idleRef = useRef<NodeJS.Timeout | null>(null);
  const { data } = useRoom(id);
  const [mutate] = useAlive(id);
  const [contextValue, setContextValue] = useState(room);
  const { data: sData } = useRoomSubscription(id);
  const { data: pData } = usePlayTime(room.code);

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
    mutate();
    const interval = setInterval(() => mutate(), 1000 * 30);

    return () => {
      clearInterval(interval);
    };
  }, [mutate]);

  useEffect(() => {
    if (data?.room) {
      setContextValue(data.room);
    }
  }, [data]);

  useEffect(() => {
    if (sData) {
      setContextValue(sData.room);
    }
  }, [sData]);

  useEffect(() => {
    if (pData && pData.playTime) {
      playTimeVar(pData.playTime);
      forcePlayTimeVar(pData.playTime);
    }
  }, [pData]);

  return (
    <Fragment>
      <Head>
        <title>{id} - Plait</title>
      </Head>
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
    </Fragment>
  );
};

RoomContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoomContainer;
