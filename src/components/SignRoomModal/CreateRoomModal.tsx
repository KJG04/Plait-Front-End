import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { useSignRoomMutation } from "../../queries/Main";
import SignRoomModalView, {
  SignRoomModalPropsType,
} from "../SignRoomModalView";

interface PropsType {
  open: boolean;
  onClose: () => void;
}

const CreateRoomModal: FC<PropsType> = (props) => {
  const { onClose, open } = props;
  const [name, setName] = useState<string>("");
  const { createMutation } = useSignRoomMutation();
  const [mutate, { loading }] = createMutation;
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
      const { errors, data } = await mutate({ variables: { name: str } });

      if (!!errors) {
        throw errors;
      }

      router.push(`/${data.createRoom.code}`);
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
    title: "방 생성하기",
    input: { ref: inputRef, value: name, onChange, onKeyDown },
    button: { disabled, onClick: submit },
    loading,
    buttonLabel: "생성",
  };

  return <SignRoomModalView {...viewProps} />;
};

export default CreateRoomModal;
