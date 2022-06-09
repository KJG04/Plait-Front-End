import * as S from "./styles";
import { Logo } from "@images";
import Image from "next/image";
import { ClipIcon, ChevronRightIcon } from "@icons";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Queue } from "@components";
import { useRoomContext } from "@hooks";
import toast from "react-hot-toast";
import { useTheme } from "@emotion/react";
import { Popover, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";

const Aside = () => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const room = useRoomContext();
  const theme = useTheme();
  const inviteLink = `${
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : ""
  }?join=${room.code}`;
  const router = useRouter();

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

  const copyCode = async (text: string) => {
    try {
      await window.navigator.clipboard.writeText(text);

      toast.success("코드가 복사되었습니다.", {
        iconTheme: {
          primary: theme.colors.primary,
          secondary: theme.colors.grayscale.darkGray,
        },
        style: {
          backgroundColor: theme.colors.grayscale.darkGray,
          color: theme.colors.grayscale.white,
        },
      });
    } catch (error) {
      toast.error("코드 복사에 실패하였습니다.", {
        iconTheme: {
          primary: theme.colors.error,
          secondary: theme.colors.grayscale.white,
        },
        style: {
          backgroundColor: theme.colors.grayscale.darkGray,
          color: theme.colors.grayscale.white,
        },
      });
    }
  };

  const onCodeClick = () => {
    copyCode(room.code);
  };

  const inviteMessage = `링크나 코드를 사용하여 Plait에 참가하세요!\n코드: ${room.code}\n초대 링크: ${inviteLink}`;

  const onInviteClick = () => {
    copyCode(inviteMessage.trim());
  };

  const onLeaveClick = () => {
    router.push("/");
  };

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
            <Popover placement="bottom">
              <Popover.Trigger>
                <S.TextButton>방 나가기</S.TextButton>
              </Popover.Trigger>
              <Popover.Content css={{ backgroundColor: "transparent" }}>
                <S.LeaveContainer>
                  <div>방을 나가시겠습니까?</div>
                  <S.LeaveButton onClick={onLeaveClick}>나가기</S.LeaveButton>
                </S.LeaveContainer>
              </Popover.Content>
            </Popover>
          </S.Header>
          <S.Line />
          <S.InviteContainer>
            <S.MemberHeader>
              <span>코드</span>
              <Tooltip content="코드 복사" color="invert">
                <S.TextButton onClick={onCodeClick}>{room.code}</S.TextButton>
              </Tooltip>
            </S.MemberHeader>
            <S.HeaderWrapper>
              <S.Link readOnly defaultValue={inviteLink} />
              <S.Copy onClick={onInviteClick}>
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
