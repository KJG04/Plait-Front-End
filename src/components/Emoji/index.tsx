import { FC, memo } from "react";
import * as S from "./styles";

interface PropsType {
  emoji: string;
}

const Emoji: FC<PropsType> = ({ emoji }) => {
  return (
    <S.Button>
      <span role="img" aria-label={emoji}>
        {emoji}
      </span>
    </S.Button>
  );
};

export default memo(Emoji);
