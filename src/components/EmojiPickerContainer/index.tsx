import gsap, { Power4 } from "gsap";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import emojis from "../../constant/emojis";
import EmojiPicker from "../EmojiPicker";
import * as S from "./styles";

const EmojiPickerContainer = () => {
  const getRandomIndex = useCallback(
    () => Math.floor(Math.random() * (emojis.length - 1)),
    [],
  );
  const prevAnim = useRef<gsap.core.Tween | null>(null);
  const emojiRef = useRef<HTMLElement>(null);

  const [index, setIndex] = useState<number>(-1);
  const emoji = useMemo(() => emojis[index], [index]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onButtonEnter = useCallback(() => {
    setIndex(getRandomIndex());
  }, [getRandomIndex]);

  const onClick = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (emojiRef.current) {
      if (prevAnim.current) {
        prevAnim.current.restart();
      } else {
        prevAnim.current = gsap.from(emojiRef.current, {
          scale: 0,
          duration: 0.5,
          ease: Power4.easeOut,
        });
      }
    }
  }, [index]);

  useEffect(() => {
    setIndex(getRandomIndex());
  }, [getRandomIndex]);

  return (
    <S.Container>
      <S.Button
        onClick={onClick}
        onFocus={onButtonEnter}
        onMouseEnter={onButtonEnter}
      >
        <span ref={emojiRef} role="img" aria-label={emoji}>
          {emoji}
        </span>
      </S.Button>
      <EmojiPicker isOpen={isOpen} />
    </S.Container>
  );
};

export default memo(EmojiPickerContainer);
