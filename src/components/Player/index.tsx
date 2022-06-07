import { useRoomContext } from "@hooks";
import { Content, ContentType } from "@types";
import { useMemo } from "react";
import * as S from "./styles";
import { YoutubePlayer } from "@components";

const Player = () => {
  const room = useRoomContext();

  const current = useMemo<Content | undefined>(() => {
    const fir = room.contents[0];

    if (!!fir) {
      return fir;
    }

    return undefined;
  }, [room]);

  if (!current) {
    return (
      <S.NotFoundContainer>
        <S.Text>:(</S.Text>
        <S.Small>지금은 보여줄 것이 없어요.</S.Small>
      </S.NotFoundContainer>
    );
  }

  if (current.contentType === ContentType.YOUTUBE) {
    return <YoutubePlayer content={current} />;
  }

  return <S.Container>{current?.contentId}</S.Container>;
};

export default Player;
