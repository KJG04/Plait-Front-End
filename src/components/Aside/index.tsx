import * as S from "./styles";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import QueueContent from "../QueueContent";

const Aside = () => {
  return (
    <S.Container>
      <S.Header>
        <Image src={Logo} alt="logo" />
        <S.Leave>방 나가기</S.Leave>
      </S.Header>
      <S.Line />
      <div>
        <S.MemberHeader>
          <span>대기열</span>
        </S.MemberHeader>
        <S.Line />
      </div>
      <S.ListContainer>
        <QueueContent />
        <QueueContent />
        <QueueContent />
        <QueueContent />
      </S.ListContainer>
    </S.Container>
  );
};

export default Aside;
