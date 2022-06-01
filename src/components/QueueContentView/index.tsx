import * as S from "./styles";
import { FC, memo } from "react";

interface PropsType {
  title: string;
  src: string;
  description: string;
  userName: string;
  isPlaying: boolean;
}

const QueueContentView: FC<PropsType> = (props) => {
  const { src, title, description, isPlaying, userName } = props;

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
