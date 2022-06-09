import { useRoomContext } from "@hooks";
import { useDeleteContentMutation } from "@queries/content";
import { useIsPlayingMutation, usePlayTimeMutation } from "@queries/room";
import { forcePlayTimeVar, playTimeVar } from "@stores";
import { Content } from "@types";
import dynamic from "next/dynamic";
import { FC, memo, useCallback, useEffect } from "react";
import * as S from "./styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DynamicTwitchPlayer = dynamic<any>(
  async () => {
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });

    return import("react-twitch-embed").then((mod) => mod.TwitchPlayer);
  },
  { ssr: false, loading: () => <div>loading</div> },
);

interface PropsType {
  content: Content;
}

const TwitchPlayer: FC<PropsType> = (props) => {
  const { content } = props;
  const { contentId, uuid } = content;
  const room = useRoomContext();
  const [mutate] = useDeleteContentMutation();
  const [playTimeMutate] = usePlayTimeMutation();
  const [isPlayingMutate] = useIsPlayingMutation();

  const onOffline = useCallback(async () => {
    await mutate({ variables: { roomCode: room.code, uuid } });
    await playTimeMutate({
      variables: {
        roomCode: room.code,
        playTime: 0,
        force: true,
      },
    });
    playTimeVar(0);
    forcePlayTimeVar(0);
  }, [mutate, playTimeMutate, room.code, uuid]);

  useEffect(() => {
    isPlayingMutate({ variables: { roomCode: room.code, condition: true } });
  }, []);

  return (
    <S.Container>
      <DynamicTwitchPlayer
        channel={contentId}
        hideControls
        parent={["localhost"]}
        allowFullscreen={false}
        width="100%"
        height="100%"
        onOffline={onOffline}
        onEnded={onOffline}
      />
      <S.Cover />
    </S.Container>
  );
};

export default memo(TwitchPlayer);
