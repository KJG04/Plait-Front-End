import * as S from "./styles";
import Test from "../../assets/Logo.svg";

const QueueContent = () => {
  return (
    <S.Container>
      <S.Img width={100} height={100} src={Test} objectFit="cover" />
    </S.Container>
  );
};
export default QueueContent;
