import { useTheme } from "@emotion/react";
import { Modal } from "@nextui-org/react";
import { FC } from "react";
import Input from "../Input";
import * as S from "./styles";

interface PropsType {
  open: boolean;
  onClose: () => void;
  roomCode: string;
}

const JoinRoomModal: FC<PropsType> = (props) => {
  const { onClose, open } = props;
  const theme = useTheme();

  return (
    <Modal
      css={{ backgroundColor: theme.colors.grayscale.black }}
      noPadding
      open={open}
      onClose={onClose}
      closeButton
      preventClose
    >
      <S.Container>
        <S.Title>방 입장하기</S.Title>
        <S.NameLabel>이름 (2자 이상 36자 이하)</S.NameLabel>
        <Input placeholder="이름을 입력해주세요..." maxLength={36} />
        <S.Button>입장</S.Button>
      </S.Container>
    </Modal>
  );
};

export default JoinRoomModal;
