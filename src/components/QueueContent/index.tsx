import * as S from "./styles";
import { FC, memo } from "react";
import { Content, ContentType } from "@types";
import { useYoutubeContentDetail } from "@queries";

interface PropsType {
  data: Content;
}

const QueueContent: FC<PropsType> = (props) => {
  const { data } = props;
  const { data: d } = useYoutubeContentDetail(data.contentId);

  return (
    <S.Container>
      {data.contentType === ContentType.YOUTUBE && (
        <S.Img
          width={100}
          height={100}
          src={`https://img.youtube.com/vi/${data.contentId}/maxresdefault.jpg`}
          objectFit="cover"
        />
      )}
      <S.ContentContainer>
        <S.Header>
          <S.Title>{d?.data.items[0].snippet.title}</S.Title>
          <S.Content>{d?.data.items[0].snippet.description}</S.Content>
        </S.Header>
        <S.Footer>
          <S.Name>{data.user.name}</S.Name>
          <S.Playing>현재 재생중</S.Playing>
        </S.Footer>
      </S.ContentContainer>
    </S.Container>
  );
};
export default memo(QueueContent);
