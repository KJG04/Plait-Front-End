import { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ScreenSaver } from "@components";
import * as S from "./styles";
import Head from "next/head";

export const Container404: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>페이지를 찾을 수 없습니다. - Plait</title>
      </Head>
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
