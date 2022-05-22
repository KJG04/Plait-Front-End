import { useTheme } from "@emotion/react";
import { Loading, Modal, ModalProps } from "@nextui-org/react";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  memo,
  RefAttributes,
} from "react";
import Input from "../Input";
import * as S from "./styles";

export interface SignRoomModalPropsType {
  title?: string;
  modal?: ModalProps;
  input?: InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>;
  button?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  loading?: boolean;
  buttonLabel?: string;
}

const SignRoomModal: FC<SignRoomModalPropsType> = (props) => {
  const { modal, input, title, button, loading, buttonLabel } = props;
  const theme = useTheme();

  return (
    <Modal
      css={{ backgroundColor: theme.colors.grayscale.black }}
      noPadding
      {...modal}
      closeButton
      preventClose
    >
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.NameLabel>이름 (2자 이상 36자 이하)</S.NameLabel>
        <Input {...input} placeholder="이름을 입력해주세요..." maxLength={36} />
        <S.Button {...button}>
          {loading ? (
            <Loading color="white" size="sm" type="points" />
          ) : (
            buttonLabel
          )}
        </S.Button>
      </S.Container>
    </Modal>
  );
};

export default memo(SignRoomModal);
