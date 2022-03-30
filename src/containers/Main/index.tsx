import { NextPage } from "next";
import * as S from "./styles";

const MainContainer: NextPage = () => {
  return (
    <S.Container>
      <S.Title>Plait에 오신걸 환영합니다!</S.Title>
      <S.Subtitle>
        <div>현재 123명이 Plait을 사용중입니다.</div>
        <div>사람들과 실시간으로 음악과 동영상을 공유해보세요.</div>
      </S.Subtitle>
      <S.CodeInput placeholder="코드를 입력해주세요..." />
    </S.Container>
  );
};

export default MainContainer;
