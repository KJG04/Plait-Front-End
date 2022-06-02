import { FC, memo } from "react";
import { Content } from "@types";
import { useYoutubeContentDetail } from "@queries";
import * as S from "./styles";
import QueueContentSkeleton from "@components/QueueContentSkeleton";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const QueueContent: FC<PropsType> = (props) => {
  const { contentId, user } = props.data;
  const src = `https://img.youtube.com/vi/${contentId}/maxresdefault.jpg`;

  const { data, isLoading, isError } = useYoutubeContentDetail(contentId);

  if (isLoading) {
    return <QueueContentSkeleton />;
  }

  if (isError) {
    return <></>;
  }

  if (!data) {
    return <QueueContentSkeleton />;
  }

  return (
    <S.Container>
      <S.Img width={100} height={100} src={src} objectFit="cover" />
      <S.ContentContainer>
        <S.Header>
          <S.Title>{data.data.items[0].snippet.title}</S.Title>
          <S.Content>{data.data.items[0].snippet.description}</S.Content>
        </S.Header>
        <S.Footer>
          <S.Name>{user.name}</S.Name>
          {props.isPlaying && <S.Playing>현재 재생중</S.Playing>}
        </S.Footer>
      </S.ContentContainer>
    </S.Container>
  );
};
export default memo(QueueContent);
