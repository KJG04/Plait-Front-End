import { memo } from "react";
import { EmojiPickerContainer, ContentController } from "@components";
import * as S from "./styles";
import { ScreenType } from "@components";

const BottomBar = () => {
  return (
    <S.Container>
      <S.Inner>
        <ContentController />
        <EmojiPickerContainer />
        <ScreenType />
      </S.Inner>
    </S.Container>
  );
};

export default memo(BottomBar);
