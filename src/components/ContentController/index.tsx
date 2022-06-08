import { memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { NextIcon, PauseIcon, PlayIcon } from "@icons";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { useRoomContext } from "@hooks";
import { useIsPlayingMutation, usePlayTimeMutation } from "@queries/room";
import { useDeleteContentMutation } from "@queries/content";
import { ContentProgress } from "@components";
import { forcePlayTimeVar, playTimeVar } from "@stores";

const ContentController = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const room = useRoomContext();
  const [mutate] = useIsPlayingMutation();
  const [deleteContentMutate] = useDeleteContentMutation();
  const [playTimeMutate] = usePlayTimeMutation();

  const onNext = useCallback(async () => {
    if (room.contents.length <= 0) {
      return;
    }

    const cur = room.contents[0];
    const { uuid } = cur;

    await deleteContentMutate({ variables: { roomCode: room.code, uuid } });
    await playTimeMutate({
      variables: {
        roomCode: room.code,
        playTime: 0,
        force: true,
      },
    });
    playTimeVar(0);
    forcePlayTimeVar(0);
  }, [deleteContentMutate, playTimeMutate, room.code, room.contents]);

  const onPlayPauseAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setIsPlaying((prev) => {
        const now = !prev;
        mutate({ variables: { roomCode: room.code, condition: now } });
        return now;
      });
    },
    [mutate, room.code],
  );

  useEffect(() => {
    setIsPlaying(room.isPlaying);
  }, [room.isPlaying]);

  return (
    <S.PlayContainer>
      <S.Buttons>
        <S.Button onClick={onPlayPauseAction}>
          {isPlaying ? (
            <Image src={PauseIcon} alt="pause" />
          ) : (
            <Image src={PlayIcon} alt="play" />
          )}
        </S.Button>
        <Tooltip content="다음 콘텐츠" color="invert">
          <S.Button disabled={room.contents.length <= 0} onClick={onNext}>
            <Image src={NextIcon} alt="next" />
          </S.Button>
        </Tooltip>
      </S.Buttons>
      <ContentProgress />
    </S.PlayContainer>
  );
};

export default memo(ContentController);
