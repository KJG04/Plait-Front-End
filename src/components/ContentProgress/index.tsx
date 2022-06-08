import { useReactiveVar } from "@apollo/client";
import { durationVar, playTimeVar } from "@stores";
import moment from "moment";
import { memo } from "react";
import * as S from "./styles";

const ContentProgress = () => {
  const playTime = useReactiveVar(playTimeVar);
  const duration = useReactiveVar(durationVar);

  const toString = (m: number) =>
    moment.utc(moment.duration(m).as("milliseconds")).format("H:mm:ss");

  return (
    <S.PrograssWrapper>
      <S.Time>{toString(1000 * 30)}</S.Time>
      <S.Progress
        percent={(playTime / duration) * 100}
        type="range"
        min={0}
        max={3 * 60 + 30}
        value={playTime}
      />
      <S.Time>{toString(1000 * 60 * 3)}</S.Time>
    </S.PrograssWrapper>
  );
};

export default memo(ContentProgress);
