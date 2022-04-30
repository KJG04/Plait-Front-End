import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Member from "../Member";
import * as S from "./styles";

const Members = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      document.addEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  const containerClassName = useMemo(() => (!isOpen ? "close" : ""), [isOpen]);

  return (
    <S.Container className={containerClassName}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Member key={index} />
        ))}
    </S.Container>
  );
};

export default memo(Members);
