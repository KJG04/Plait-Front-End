import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import * as S from "./styles";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface QueueContentViewPropsType {
  title: string;
  description: string;
  src: string;
  isPlaying: boolean;
  userName: string;
  onDelete: () => void;
}

const QueueContentView: FC<QueueContentViewPropsType> = (props) => {
  const { src, description, isPlaying, title, userName, onDelete } = props;

  const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete();
  };

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
      <S.DeleteContainer onClick={onDeleteClick} className="delete">
        <FontAwesomeIcon size="1x" fixedWidth icon={faTrashCan} />
      </S.DeleteContainer>
    </S.Container>
  );
};
export default memo(QueueContentView);
