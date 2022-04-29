import * as S from "./styles";
import Test from "../../assets/Logo.svg";
import { memo } from "react";

const QueueContent = () => {
  return (
    <S.Container>
      <S.Img width={100} height={100} src={Test} objectFit="cover" />
      <S.ContentContainer>
        <S.Header>
          <S.Title>
            국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를
            위하여 필요한 경우에 한하여 법률로써 제한할 수 있...
          </S.Title>
          <S.Content>
            국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를
            위하여 필요한 경우에 한하여 법률로써 제한할 수 있...
          </S.Content>
        </S.Header>
        <S.Footer>
          <S.Name>rlawlsrms</S.Name>
          <S.Playing>현재 재생중</S.Playing>
        </S.Footer>
      </S.ContentContainer>
    </S.Container>
  );
};
export default memo(QueueContent);
