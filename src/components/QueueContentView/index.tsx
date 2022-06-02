import { FC, memo } from "react";
import * as S from "./styles";

export interface QueueContentViewPropsType {
  title: string;
  description: string;
  src: string;
  isPlaying: boolean;
  userName: string;
  uuid: string;
}

const QueueContentView: FC<QueueContentViewPropsType> = (props) => {
  const { src, description, isPlaying, title, userName } = props;

  return (
    <S.Container>
      <S.Img width={100} height={100} src={src} objectFit="cover" />
      <S.ContentContainer>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Content>{description}</S.Content>
        </S.Header>
        <S.Footer>
          <S.Name>{userName}</S.Name>
          {isPlaying && <S.Playing>현재 재생중</S.Playing>}
        </S.Footer>
      </S.ContentContainer>
    </S.Container>
  );
};
export default memo(QueueContentView);
