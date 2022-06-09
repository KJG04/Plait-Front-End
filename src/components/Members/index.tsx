import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Member from "@components/Member";
import * as S from "./styles";
import { useRoomContext } from "@hooks";

const Members = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const room = useRoomContext();

  const onMouseMove = useCallback((e: MouseEvent) => {
    const { clientY: y } = e;

    if (y > 0 && y < 70) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  const containerClassName = useMemo(() => (!isOpen ? "close" : ""), [isOpen]);

  return (
    <S.Container className={containerClassName}>
      {room.users.map((value) => (
        <Member key={value.uuid} user={value} />
      ))}
    </S.Container>
  );
};

export default memo(Members);
