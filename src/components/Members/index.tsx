import * as S from "./styles";

const Members = () => {
  return (
    <S.Container>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <S.Profile key={index} />
        ))}
    </S.Container>
  );
};

export default Members;
