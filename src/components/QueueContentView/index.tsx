import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import * as S from "./styles";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/react";

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

  const onDeleteClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
      <S.DeleteContainer onDoubleClick={onDeleteClick} className="delete">
        <Tooltip content="두번 클릭으로 삭제" placement="right" color="invert">
          <FontAwesomeIcon size="1x" fixedWidth icon={faTrashCan} />
        </Tooltip>
      </S.DeleteContainer>
    </S.Container>
  );
};
export default memo(QueueContentView);
