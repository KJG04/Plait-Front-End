import * as S from "./styles";

const QueueContentSkeleton = () => {
  return (
    <S.Container>
      <S.Img />
      <S.ContentContainer>
        <S.Header>
          <S.Title>12345678901234567890</S.Title>
          <S.ContentWrapper>
            <S.Content>123456789012345678901234567890</S.Content>
          </S.ContentWrapper>
          <S.ContentWrapper>
            <S.Content>1234567890</S.Content>
          </S.ContentWrapper>
        </S.Header>
        <S.Footer>
          <div>
            <S.Name>123456</S.Name>
          </div>
        </S.Footer>
      </S.ContentContainer>
    </S.Container>
  );
};

export default QueueContentSkeleton;
