import { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ScreenSaver } from "@components";
import * as S from "./styles";

export const Container500: NextPage = () => {
  return (
    <Fragment>
      <ScreenSaver />
      <S.Container>
        <S.Title>500</S.Title>
        <S.Content>요청 처리중 오류 발생</S.Content>
        <Link href="/" passHref>
          <S.Move>메인 화면으로</S.Move>
        </Link>
      </S.Container>
    </Fragment>
  );
};

export default Container500;
