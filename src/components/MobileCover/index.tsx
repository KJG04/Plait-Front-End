import * as S from "./styles";
import { Logo } from "@images";
import Image from "next/image";

const MobileCover = () => {
  return (
    <div>
      <S.Container>
        <Image width={150} height={50} src={Logo} alt="로고" />
        <S.Title>데스크탑으로 접속해주세요.</S.Title>
        <S.Description>Plait은 아직 모바일을 지원하지 않아요.</S.Description>
      </S.Container>
    </div>
  );
};

export default MobileCover;
