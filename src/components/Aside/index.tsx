import * as S from "./styles";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import ChevronDown from "../../assets/chevron-down.svg";
import Member from "../Member";

const Aside = () => {
  return (
    <S.Container>
      <S.Header>
        <Image src={Logo} alt="logo" />
        <S.Leave>
          <S.Leave>방 나가기</S.Leave>
        </S.Leave>
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
    </S.Container>
  );
};

export default Aside;
