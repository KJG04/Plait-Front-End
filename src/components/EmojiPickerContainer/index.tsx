import gsap, { Elastic } from "gsap";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import emojis from "@constant/emojis";
import { EmojiPicker } from "@components";
import * as S from "./styles";
import OutsideClickHandler from "react-outside-click-handler";

const EmojiPickerContainer = () => {
  const getRandomIndex = useCallback(
    () => Math.floor(Math.random() * (emojis.length - 1)),
    [],
  );
  const prevAnim = useRef<gsap.core.Tween | null>(null);
  const emojiRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState<number>(-1);
  const emoji = useMemo(() => emojis[index], [index]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onButtonEnter = useCallback(() => {
    setIndex(getRandomIndex());
  }, [getRandomIndex]);

  const onClick = useCallback(() => setIsOpen((prev) => !prev), []);

  const onOutsideClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (emojiRef.current) {
      if (prevAnim.current) {
        prevAnim.current.restart();
      } else {
        prevAnim.current = gsap.from(emojiRef.current, {
          scale: 0,
          duration: 1,
          ease: Elastic.easeOut.config(1, 0.5),
        });
      }
    }
  }, [index]);

  useEffect(() => {
    setIndex(getRandomIndex());
  }, [getRandomIndex]);

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <S.Container ref={containerRef}>
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
    </OutsideClickHandler>
  );
};

export default memo(EmojiPickerContainer);
