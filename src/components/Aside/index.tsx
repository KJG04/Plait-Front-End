import * as S from "./styles";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import ChevronDown from "../../assets/chevron-down.svg";
import Member from "../Member";
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
          <span>멤버</span>
          <Image src={ChevronDown} alt="Chevron Down" />
        </S.MemberHeader>
        <S.Line />
      </div>
      <Member />
      <Member />
      <Member />
      <Member />
      <div>
        <S.MemberHeader>
          <span>대기열</span>
        </S.MemberHeader>
        <S.Line />
      </div>
      <S.QueueContainer>
        <QueueContent />
        <QueueContent />
        <QueueContent />
        <QueueContent />
      </S.QueueContainer>
    </S.Container>
  );
};

export default Aside;
