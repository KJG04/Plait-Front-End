import { floatingEmojisVar } from "@stores";
import { FloatingEmojiType } from "@types";
import gsap, { Elastic, Linear, Power4 } from "gsap";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import * as S from "./styles";

const FloatingEmoji: FC<FloatingEmojiType> = ({
  emoji,
  id,
  x,
  y,
  color,
  name,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const anim = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const tl = gsap.timeline();

    tl.from(
      containerRef.current,
      {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0,
    )
      .to(
        containerRef.current,
        {
          duration: 3,
          y: -100,
          ease: Linear.easeNone,
        },
        "<",
      )
      .to(
        containerRef.current,
        {
          scale: 0,
          duration: 0.5,
          ease: Power4.easeIn,
          onComplete: () => {
            floatingEmojisVar(floatingEmojisVar().filter((v) => v.id !== id));
          },
        },
        2.5,
      );
  }, [id]);

  useEffect(() => {
    anim();
  }, [anim]);

  return (
    <S.Container ref={containerRef} style={{ top: `${y}px`, left: `${x}px` }}>
      <S.Emoji color={color}>{emoji}</S.Emoji>
      <S.Name color={color}>{name}</S.Name>
    </S.Container>
  );
};

export default memo(FloatingEmoji);
