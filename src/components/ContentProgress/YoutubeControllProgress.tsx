import { useReactiveVar } from "@apollo/client";
import { useRoomContext } from "@hooks";
import { usePlayTime, usePlayTimeMutation } from "@queries/room";
import { durationVar, playTimeVar } from "@stores";
import moment from "moment";
import { memo, useEffect } from "react";
import * as S from "./styles";

const YoutubeControllProgress = () => {
  const playTime = useReactiveVar(playTimeVar);
  const duration = useReactiveVar(durationVar);
  const room = useRoomContext();
  const { data } = usePlayTime(room.code);
  const [playTimeMutate] = usePlayTimeMutation();

  const toString = (m: number) =>
    moment.utc(moment.duration(m).as("milliseconds")).format("H:mm:ss");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    playTimeMutate({
      variables: {
        roomCode: room.code,
        playTime: Number.parseInt(e.target.value),
        force: true,
      },
    });
  };

  useEffect(() => {
    playTimeVar(room.playTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.playTime) {
      playTimeVar(data.playTime);
    }
  }, [data]);

  return (
    <S.PrograssWrapper>
      <S.Time>{toString(playTime)}</S.Time>
      <S.Progress
        percent={(playTime / duration) * 100}
        type="range"
        min={0}
        max={duration}
        defaultValue={playTime}
        onChange={onChange}
      />
      <S.Time>{toString(duration)}</S.Time>
    </S.PrograssWrapper>
  );
};

export default memo(YoutubeControllProgress);
