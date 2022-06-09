import { FC, memo, useCallback, useMemo } from "react";
import { emojis } from "@constant";
import { Emoji } from "@components";
import * as S from "./styles";

interface PropsType {
  isOpen: boolean;
}

const EmojiPicker: FC<PropsType> = ({ isOpen }) => {
  const containerClassName = useMemo(() => (isOpen ? "" : "close"), [isOpen]);

  const renderEmojis = useCallback(
    (value: string) => <Emoji key={value} emoji={value} />,
    [],
  );

  return (
    <S.Container className={containerClassName}>
      <S.Title>
        감정표현
        <S.Description>끌어서 놓기 또는 클릭</S.Description>
      </S.Title>
      <S.Subtitle>모든 이모지</S.Subtitle>
      <S.Grid>{emojis.map(renderEmojis)}</S.Grid>
    </S.Container>
  );
};

export default memo(EmojiPicker);
