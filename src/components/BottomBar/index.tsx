import { memo } from "react";
import ContentController from "../ContentController";
import * as S from "./styles";

const BottomBar = () => {
  return (
    <S.Container>
      <S.Inner>
        <ContentController />
      </S.Inner>
    </S.Container>
  );
};

export default memo(BottomBar);
