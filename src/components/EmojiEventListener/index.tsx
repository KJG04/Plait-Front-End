import React, { memo, useMemo } from "react";
import { useCallback, useEffect } from "react";
import { EmojiEvent, emojiEventName } from "@constant";
import { FloatingEmoji } from "@components";
import * as S from "./styles";
import { v4 } from "uuid";
import { useEmoji } from "@queries/emoji";
import { useRoomContext } from "@hooks";
import { floatingEmojisVar } from "@stores";
import { useReactiveVar } from "@apollo/client";
import { FloatingEmojiType } from "@types";

const EmojiEventListener = () => {
  const room = useRoomContext();
  const { data } = useEmoji(room.code);
  const floatingEmojis = useReactiveVar(floatingEmojisVar);

  const emojiListener = useCallback((e: Event) => {
    if (!(e instanceof EmojiEvent)) {
      return;
    }

    const newEmoji: FloatingEmojiType = {
      emoji: e.emoji,
      id: v4(),
      x: e.x,
      y: e.y,
      color: e.color,
      name: e.name,
    };

    floatingEmojisVar([...floatingEmojisVar(), newEmoji]);
  }, []);

  useEffect(() => {
    document.addEventListener(emojiEventName, emojiListener);

    return () => {
      document.removeEventListener(emojiEventName, emojiListener);
    };
  }, [emojiListener]);

  useEffect(() => {
    if (data?.listeningEmoji) {
      const d = data.listeningEmoji;
      const e = new EmojiEvent(d.emoji, d.name, d.color, d.x, d.y);
      document.dispatchEvent(e);
    }
  }, [data]);

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
