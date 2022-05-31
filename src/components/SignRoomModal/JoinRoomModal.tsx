import { useRouter } from "next/router";
import { FC, memo, useEffect, useRef, useState } from "react";
import { useSignRoomMutation } from "@queries";
import SignRoomModalView, {
  SignRoomModalPropsType,
} from "@components/SignRoomModalView";

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
  const [wait, setWait] = useState<boolean>(false);

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
      setWait(true);

      setTimeout(() => {
        router.push(`/${roomCode}`);
      }, 1000);
    } catch (error) {
      inputRef.current?.focus();
      setName("");
    }
  };

  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);

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
    loading: loading || wait,
    buttonLabel: "입장",
  };

  return <SignRoomModalView {...viewProps} />;
};

export default memo(JoinRoomModal);
