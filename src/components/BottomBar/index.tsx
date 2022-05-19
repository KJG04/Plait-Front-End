import { memo } from "react";
import ContentController from "../ContentController";
import EmojiPickerContainer from "../EmojiPickerContainer";
import * as S from "./styles";

const BottomBar = () => {
  return (
    <S.Container>
      <S.Inner>
        <ContentController />
        <EmojiPickerContainer />
      </S.Inner>
    </S.Container>
  );
};

export default memo(BottomBar);
