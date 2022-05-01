import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import usedEmojiState from "../../atoms/usedEmoji";
import emojis from "../../constant/emojis";
import storageKeys from "../../constant/storageKeys";
import Emoji from "../Emoji";
import * as S from "./styles";

interface PropsType {
  isOpen: boolean;
}

const EmojiPicker: FC<PropsType> = ({ isOpen }) => {
  const containerClassName = useMemo(() => (isOpen ? "" : "close"), [isOpen]);
  const [usedEmoji, setUsedEmoji] = useRecoilState(usedEmojiState);

  const renderEmojis = useCallback(
    (value: string) => <Emoji key={value} emoji={value} />,
    [],
  );

  useEffect(() => {
    const localUsedEmoji = JSON.parse(
      localStorage.getItem(storageKeys.usedEmoji) || "[]",
    ) as string[];

    setUsedEmoji(localUsedEmoji);
  }, [setUsedEmoji]);

  return (
    <S.Container className={containerClassName}>
      {usedEmoji.length > 0 && (
        <>
          <S.Title>최근 이모지</S.Title>
          <S.Grid>{usedEmoji.map(renderEmojis)}</S.Grid>
        </>
      )}
      <S.Title>모든 이모지</S.Title>
      <S.Grid>{emojis.map(renderEmojis)}</S.Grid>
    </S.Container>
  );
};

export default memo(EmojiPicker);
