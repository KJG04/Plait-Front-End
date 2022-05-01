import { FC, memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import usedEmojiState from "../../atoms/usedEmoji";
import storageKeys from "../../constant/storageKeys";
import * as S from "./styles";

interface PropsType {
  emoji: string;
}

const Emoji: FC<PropsType> = ({ emoji }) => {
  const setUsedEmoji = useSetRecoilState(usedEmojiState);

  const onDragEnd = useCallback(
    (e: React.DragEvent) => {
      console.log(e.clientX, e.clientY);
      setUsedEmoji((prev) => {
        const result = [...new Set([emoji, ...prev])].slice(0, 8);
        localStorage.setItem(storageKeys.usedEmoji, JSON.stringify(result));

        return result;
      });
    },
    [emoji, setUsedEmoji],
  );

  return (
    <S.Button>
      <span role="img" draggable aria-label={emoji} onDragEnd={onDragEnd}>
        {emoji}
      </span>
    </S.Button>
  );
};

export default memo(Emoji);
