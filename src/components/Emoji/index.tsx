import { useTheme } from "@emotion/react";
import { FC, memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import usedEmojiState from "../../atoms/usedEmoji";
import { EmojiEvent } from "../../constant/emojiEvent";
import storageKeys from "../../constant/storageKeys";
import * as S from "./styles";

interface PropsType {
  emoji: string;
}

const Emoji: FC<PropsType> = ({ emoji }) => {
  const setUsedEmoji = useSetRecoilState(usedEmojiState);
  const theme = useTheme();

  const onDragEnd = useCallback(
    (e: React.DragEvent) => {
      setUsedEmoji((prev) => {
        const result = [...new Set([emoji, ...prev])].slice(0, 8);
        localStorage.setItem(storageKeys.usedEmoji, JSON.stringify(result));

        return result;
      });
      const { clientX, clientY } = e;

      const event = new EmojiEvent(
        emoji,
        "김진근",
        theme.colors.primary,
        clientX,
        clientY,
      );

      document.dispatchEvent(event);
    },
    [emoji, setUsedEmoji, theme.colors.primary],
  );

  const onClick = useCallback(() => {
    const { width, height } = window.screen;
    const offset = 200;

    const x = offset / 2 + Math.random() * (width - offset);
    const y = offset / 2 + Math.random() * (height - offset);

    const event = new EmojiEvent(emoji, "김진근", theme.colors.primary, x, y);

    document.dispatchEvent(event);
  }, [emoji, theme.colors.primary]);

  return (
    <S.Button onClick={onClick}>
      <span role="img" draggable aria-label={emoji} onDragEnd={onDragEnd}>
        {emoji}
      </span>
    </S.Button>
  );
};

export default memo(Emoji);
