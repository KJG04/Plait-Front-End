import { FC, memo, useMemo } from "react";
import emojis from "../../constant/emojis";
import Emoji from "../Emoji";
import * as S from "./styles";

interface PropsType {
  isOpen: boolean;
}

const EmojiPicker: FC<PropsType> = ({ isOpen }) => {
  const containerClassName = useMemo(() => (isOpen ? "" : "close"), [isOpen]);

  return (
    <S.Container className={containerClassName}>
      {emojis.map((value) => (
        <Emoji key={value} emoji={value} />
      ))}
    </S.Container>
  );
};

export default memo(EmojiPicker);
