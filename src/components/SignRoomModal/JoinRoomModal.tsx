import { useRouter } from "next/router";
import { FC, memo, useRef, useState } from "react";
import { useSignRoomMutation } from "../../queries/Main";
import SignRoomModalView, {
  SignRoomModalPropsType,
} from "../SignRoomModalView";

interface PropsType {
  open: boolean;
  onClose: () => void;
  roomCode: string;
}

const JoinRoomModal: FC<PropsType> = (props) => {
  const { onClose, open, roomCode } = props;
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

  const viewProps: SignRoomModalPropsType = {
    modal: { open, onClose },
    title: "방 입장하기",
    input: { ref: inputRef, value: name, onChange, onKeyDown },
    button: { disabled, onClick: submit },
    loading,
    buttonLabel: "입장",
  };

  return <SignRoomModalView {...viewProps} />;
};

export default memo(JoinRoomModal);
