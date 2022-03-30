import { forwardRef, InputHTMLAttributes } from "react";
import * as S from "./styles";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <S.Container>
      <S.Input ref={ref} {...props} />
      <S.Line />
    </S.Container>
  );
});

Input.displayName = "Input";

export default Input;
