import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from "react";
import * as S from "./styles";

type PropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
};

const ButtonWithLoading: FC<PropsType> = (props) => {
  const { children, loading, ...rest } = props;

  return (
    <button {...rest}>
      <S.LoadingContainer>
        <S.Label className={loading ? " loading" : ""}>{children}</S.Label>
        <S.LoadingIcon
          className={loading ? "active" : ""}
          color="white"
          size="sm"
          type="points"
        />
      </S.LoadingContainer>
    </button>
  );
};

export default memo(ButtonWithLoading);
