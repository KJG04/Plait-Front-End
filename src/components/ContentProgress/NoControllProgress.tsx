import { FC } from "react";
import * as S from "./styles";

interface PropsType {
  percent: number;
}

const NoControllProgress: FC<PropsType> = (props) => {
  const { percent } = props;

  return (
    <S.PrograssWrapper>
      <S.Time>---</S.Time>
      <S.Progress
        percent={percent}
        type="range"
        min={0}
        max={100}
        defaultValue={percent}
      />
      <S.Time>---</S.Time>
    </S.PrograssWrapper>
  );
};

export default NoControllProgress;
