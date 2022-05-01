import React, { memo, useMemo } from "react";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import floatingEmojisState, {
  FloatingEmojiType,
} from "../../atoms/floatingEmojis";
import { EmojiEvent, emojiEventName } from "../../constant/emojiEvent";
import FloatingEmoji from "../FloatingEmoji";
import * as S from "./styles";
import uuid from "uuid";

const EmojiEventListener = () => {
  const [floatingEmojis, setFloatingEmojis] =
    useRecoilState(floatingEmojisState);

  const emojiListener = useCallback(
    (e: Event) => {
      if (!(e instanceof EmojiEvent)) {
        return;
      }

      const newEmoji: FloatingEmojiType = {
        emoji: e.emoji,
        id: uuid.v4(),
        xPercent: e.xPercent,
        yPercent: e.yPercent,
      };

      setFloatingEmojis((prev) => [...prev, newEmoji]);
    },
    [setFloatingEmojis],
  );

  useEffect(() => {
    document.addEventListener(emojiEventName, emojiListener);

    return () => {
      document.removeEventListener(emojiEventName, emojiListener);
    };
  }, [emojiListener]);

  const renderFloatingEmojis = useMemo(
    () =>
      floatingEmojis.map((value) => (
        <FloatingEmoji {...value} key={value.id} />
      )),
    [floatingEmojis],
  );

  return <S.Container>{renderFloatingEmojis}</S.Container>;
};

export default memo(EmojiEventListener);
