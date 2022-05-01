import { useCallback, useEffect } from "react";
import { EmojiEvent, emojiEventName } from "../../constant/emojiEvent";

const EmojiEventListener = () => {
  const emojiListener = useCallback((e: Event) => {
    if (!(e instanceof EmojiEvent)) {
      return;
    }
  }, []);

  useEffect(() => {
    document.addEventListener(emojiEventName, emojiListener);

    return () => {
      document.removeEventListener(emojiEventName, emojiListener);
    };
  }, [emojiListener]);

  return <></>;
};

export default EmojiEventListener;
