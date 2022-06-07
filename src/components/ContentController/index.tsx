import { memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { NextIcon, PauseIcon, PlayIcon } from "@icons";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { useRoomContext } from "@hooks";
import { useIsPlayingMutation } from "@queries/room";
import { useDeleteContentMutation } from "@queries/content";

const ContentController = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const room = useRoomContext();
  const [mutate] = useIsPlayingMutation();
  const [deleteContentMutate] = useDeleteContentMutation();

  const onNext = useCallback(() => {
    if (room.contents.length <= 0) {
      return;
    }

    const cur = room.contents[0];
    const { uuid } = cur;

    deleteContentMutate({ variables: { roomCode: room.code, uuid } });
  }, [deleteContentMutate, room.code, room.contents]);

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
      <S.PrograssWrapper>
        <S.Time>{time}</S.Time>
        <S.Progress
          percent={(time / (3 * 60 + 30)) * 100}
          type="range"
          min={0}
          max={3 * 60 + 30}
          value={time}
          onChange={(e) => setTime(e.target.valueAsNumber)}
        />
        <S.Time>3:30</S.Time>
      </S.PrograssWrapper>
    </S.PlayContainer>
  );
};

export default memo(ContentController);
