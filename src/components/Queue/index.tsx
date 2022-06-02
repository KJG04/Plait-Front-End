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
      <S.ListContainer>
        {renderQueue}
        {room && room.contents.length <= 0 && (
          <S.Message>
            <div>대기열이 비어있어요.</div>
            컨텐츠를 추가해보세요!
          </S.Message>
        )}
      </S.ListContainer>
      {room && (
        <ContentPicker
          id={room.code}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
    </>
  );
};

export default memo(Queue);
