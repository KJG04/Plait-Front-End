import { memo, useState } from "react";
import { QueueContent, ContentPicker } from "@components";
import * as S from "./styles";

const Queue = () => {
  const [open, setOpen] = useState(false);

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
        <QueueContent />
        <QueueContent />
        <QueueContent />
        <QueueContent />
      </S.ListContainer>
      <ContentPicker onClose={() => setOpen(false)} open={open} />
    </>
  );
};

export default memo(Queue);
