import { memo, useRef } from "react";
import ContentPicker from "../ContentPicker";
import ModalPortal, { ModalPortalRef } from "../ModalPortal";
import QueueContent from "../QueueContent";
import * as S from "./styles";

const Queue = () => {
  const modalRef = useRef<ModalPortalRef>(null);

  return (
    <>
      <div>
        <S.MemberHeader>
          <span>대기열</span>
          <S.TextButton
            onClick={() => {
              modalRef.current?.open();
            }}
          >
            추가
          </S.TextButton>
        </S.MemberHeader>
        <S.Line />
      </div>
      <S.ListContainer>
        <QueueContent />
        <QueueContent />
        <QueueContent />
        <QueueContent />
      </S.ListContainer>
      <ModalPortal ref={modalRef}>
        <ContentPicker />
      </ModalPortal>
    </>
  );
};

export default memo(Queue);
