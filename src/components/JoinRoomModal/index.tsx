import { useTheme } from "@emotion/react";
import { Loading, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, memo, useRef, useState } from "react";
import { useSignRoomMutation } from "../../queries/Main";
import Input from "../Input";
import * as S from "./styles";

interface PropsType {
  open: boolean;
  onClose: () => void;
  roomCode: string;
}

const JoinRoomModal: FC<PropsType> = (props) => {
  const { onClose, open, roomCode } = props;
  const theme = useTheme();
  const [name, setName] = useState<string>("");
  const { joinMutation } = useSignRoomMutation();
  const [mutate, { loading }] = joinMutation;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value);

  const disabled = name.trim().length < 2 || loading;

  const submit = async () => {
    const str = name.trim();

    if (str.length < 2 || loading) {
      return;
    }

    try {
      const { errors } = await mutate({ variables: { roomCode, name: str } });

      if (!!errors) {
        throw errors;
      }

      router.push(`/${roomCode}`);
    } catch (error) {
      inputRef.current?.focus();
      setName("");
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      submit();
    }
  };

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
        <Input
          ref={inputRef}
          placeholder="이름을 입력해주세요..."
          maxLength={36}
          value={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <S.Button disabled={disabled} onClick={submit}>
          {loading && <Loading size="sm" />}
          입장
        </S.Button>
      </S.Container>
    </Modal>
  );
};

export default memo(JoinRoomModal);
