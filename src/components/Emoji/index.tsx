import { FC, memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { usedEmojiState } from "@atoms";
import { storageKeys } from "@constant";
import * as S from "./styles";
import { useEmojiMutation } from "@queries";
import { useRoomContext } from "@hooks";

interface PropsType {
  emoji: string;
}

const Emoji: FC<PropsType> = ({ emoji }) => {
  const setUsedEmoji = useSetRecoilState(usedEmojiState);
  const room = useRoomContext();
  const [mutate] = useEmojiMutation();

  const onDragEnd = useCallback(
    (e: React.DragEvent) => {
      setUsedEmoji((prev) => {
        const result = [...new Set([emoji, ...prev])].slice(0, 8);
        localStorage.setItem(storageKeys.usedEmoji, JSON.stringify(result));

        return result;
      });
      const { clientX, clientY } = e;

      mutate({
        variables: {
          roomCode: room.code,
          emoji: {
            emoji,
            x: clientX,
            y: clientY,
          },
        },
      });
    },
    [emoji, mutate, room.code, setUsedEmoji],
  );

  const onClick = useCallback(() => {
    const { width, height } = window.screen;
    const offset = 200;

    const x = offset / 2 + Math.random() * (width - offset);
    const y = offset / 2 + Math.random() * (height - offset);

    mutate({
      variables: {
        roomCode: room.code,
        emoji: {
          emoji,
          x,
          y,
        },
      },
    });
  }, [emoji, mutate, room.code]);

  return (
    <S.Button onClick={onClick}>
      <span role="img" draggable aria-label={emoji} onDragEnd={onDragEnd}>
        {emoji}
      </span>
    </S.Button>
  );
};

export default memo(Emoji);
