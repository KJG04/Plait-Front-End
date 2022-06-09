import { useTheme } from "@emotion/react";
import { Tooltip } from "@nextui-org/react";
import { User } from "@types";
import { FC, memo } from "react";
import * as S from "./styles";

interface PropsType {
  user: User;
}

const Member: FC<PropsType> = (props) => {
  const { color, isListening, name } = props.user;
  const theme = useTheme();

  return (
    <Tooltip color="invert" content={name} placement="bottom">
      <S.Profile
        style={{
          backgroundColor: isListening
            ? `#${color}`
            : theme.colors.grayscale.lightGray,
        }}
      >
        {[...name][0]}
      </S.Profile>
    </Tooltip>
  );
};

export default memo(Member);
