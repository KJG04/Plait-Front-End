import { memo } from "react";
import { EmojiPickerContainer, ContentController } from "@components";
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
