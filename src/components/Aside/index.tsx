import * as S from "./styles";
import Logo from "../../assets/Logo.svg";
import Image from "next/image";
import QueueContent from "../QueueContent";
import { ClipIcon } from "../../assets/icons";

const Aside = () => {
  return (
    <S.Container>
      <S.Header>
        <Image src={Logo} alt="logo" />
        <S.TextButton>방 나가기</S.TextButton>
      </S.Header>
      <S.Line />
      <S.InviteContainer>
        <S.MemberHeader>
          <span>코드</span>
          <S.TextButton>GHRJQK</S.TextButton>
        </S.MemberHeader>
        <S.HeaderWrapper>
          <S.Link
            value="
        https://www.google.com/search?q=css+Range+Slider&oq=css+Range+Slider&aqs=chrome..69i57j69i64j69i61.1092j0j7&sourceid=chrome&ie=UTF-8&safe=active&ssui=on
      "
          />
          <S.Copy>
            <Image src={ClipIcon} alt="copy" />
          </S.Copy>
        </S.HeaderWrapper>
      </S.InviteContainer>
      <div>
        <S.MemberHeader>
          <span>대기열</span>
          <S.TextButton>추가</S.TextButton>
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
