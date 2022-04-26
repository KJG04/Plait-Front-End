import Image from "next/image";
import * as S from "./styles";
import { NextIcon, PauseIcon, PlayIcon } from "../../assets/icons";
import React, { useCallback, useState } from "react";

const BottomBar = () => {
  const [isPause, setIsPause] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const onPlayPauseAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setIsPause((prev) => !prev);
    },
    [],
  );

  return (
    <S.Container>
      <S.Inner>
        <S.PlayContainer>
          <S.Buttons>
            <S.Button onClick={onPlayPauseAction}>
              {isPause ? (
                <Image src={PauseIcon} alt="pause" />
              ) : (
                <Image src={PlayIcon} alt="play" />
              )}
            </S.Button>
            <S.Button>
              <Image src={NextIcon} alt="next" />
            </S.Button>
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
      </S.Inner>
    </S.Container>
  );
};

export default BottomBar;
