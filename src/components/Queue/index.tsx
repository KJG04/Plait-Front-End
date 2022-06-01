import { memo, useMemo, useState } from "react";
import { QueueContent, ContentPicker } from "@components";
import { useRoomContext } from "@hooks";
import * as S from "./styles";

const Queue = () => {
  const [open, setOpen] = useState(false);
  const room = useRoomContext();

  const renderQueue = useMemo(
    () =>
      room?.contents.map((value, index) => {
        return (
          <QueueContent isPlaying={index === 0} data={value} key={value.uuid} />
        );
      }),
    [room],
  );

  return (
    <>
      <div>
        <S.MemberHeader>
          <span>대기열</span>
          <S.TextButton onClick={() => setOpen(true)}>추가</S.TextButton>
        </S.MemberHeader>
        <S.Line />
      </div>
      <S.ListContainer>{renderQueue}</S.ListContainer>
      <ContentPicker onClose={() => setOpen(false)} open={open} />
    </>
  );
};

export default memo(Queue);
