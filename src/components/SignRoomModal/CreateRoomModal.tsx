import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { useSignRoomMutation } from "@queries/main";
import SignRoomModalView, {
  SignRoomModalPropsType,
} from "@components/SignRoomModalView";

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
      const { errors, data } = await mutate({ variables: { name: str } });

      if (!!errors) {
        throw errors;
      }
      setWait(true);

      setTimeout(() => {
        console.log(data);

        router.push(`/${data.createRoom.code}`);
      }, 1000);
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

  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);

  const viewProps: SignRoomModalPropsType = {
    modal: { open, onClose },
    title: "방 생성하기",
    input: { ref: inputRef, value: name, onChange, onKeyDown },
    button: { disabled, onClick: submit },
    loading: loading || wait,
    buttonLabel: "생성",
  };

  return <SignRoomModalView {...viewProps} />;
};

export default CreateRoomModal;
