import * as S from "./styles";
import { Logo } from "@images";
import Image from "next/image";
import { ClipIcon, ChevronRightIcon } from "@icons";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Queue } from "@components";

const Aside = () => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  const omMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) {
      return;
    }

    const { clientX: x, clientY: y } = e;
    const { top, left, bottom, right } =
      containerRef.current.getBoundingClientRect();
    const offset = 70;

    if (left < x && right + offset > x && top < y && bottom > y) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  }, []);

  const outerClassName = useMemo(() => (!isOpen ? "close" : ""), [isOpen]);
  const toggleClassName = useMemo(
    () => `${isHover ? "hover" : ""} ${outerClassName}`,
    [isHover, outerClassName],
  );

  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    window.addEventListener("mousemove", omMouseMove);

    return () => {
      window.removeEventListener("mousemove", omMouseMove);
    };
  }, [omMouseMove]);

  return (
    <>
      <S.Outer className={outerClassName}>
        <S.ToggleButton className={toggleClassName} onClick={onToggle}>
          <Image
            className="icon"
            src={ChevronRightIcon}
            alt="chevron right"
            layout="fixed"
            height={48}
            width={48}
          />
        </S.ToggleButton>
        <S.Container ref={containerRef}>
          <S.Header>
            <Image src={Logo} alt="logo" />
            <S.TextButton>방 나가기</S.TextButton>
          </S.Header>
          <S.Line />
          <S.InviteContainer>
            <S.MemberHeader>
              <span>코드</span>
              <S.TextButton>GHRJQK</S.TextButton>
            </S.MemberHeader>
            <S.HeaderWrapper>
              <S.Link
                readOnly
                defaultValue="
        https://www.google.com/search?q=css+Range+Slider&oq=css+Range+Slider&aqs=chrome..69i57j69i64j69i61.1092j0j7&sourceid=chrome&ie=UTF-8&safe=active&ssui=on
      "
              />
              <S.Copy>
                <Image src={ClipIcon} alt="copy" />
              </S.Copy>
            </S.HeaderWrapper>
          </S.InviteContainer>
          <Queue />
        </S.Container>
      </S.Outer>
    </>
  );
};

export default memo(Aside);
