import { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ScreenSaver } from "@components";
import * as S from "./styles";

export const Container404: NextPage = () => {
  return (
    <Fragment>
      <ScreenSaver />
      <S.Container>
        <S.Title>404</S.Title>
        <S.Content>페이지를 찾을 수 없습니다.</S.Content>
        <Link href="/" passHref>
          <S.Move>메인 화면으로</S.Move>
        </Link>
      </S.Container>
    </Fragment>
  );
};

export default Container404;
