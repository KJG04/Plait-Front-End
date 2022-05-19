import { Tooltip } from "@nextui-org/react";
import { TooltipOnVisibleChange } from "@nextui-org/react/types/tooltip/tooltip";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import ScreenSaver from "../../components/ScreenSaver";
import { useRoomExists } from "../../queries/Main";
import * as S from "./styles";

const MainContainer: NextPage = () => {
  const [code, setCode] = useState<string>("");
  const [tootipContent, setTootipContent] =
    useState<string>("Enter로 입장하세요.");
  const [tootipColor, setTootipColor] = useState<"invert" | "error">("invert");
  const tooltipVisible = code.trim().length >= 6;
  const [getRoomIsExists, { loading }] = useRoomExists();

  const onCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setCode(e.target.value);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (loading) {
      return;
    }

    try {
      const { error } = await getRoomIsExists({
        variables: { roomCode: code },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setTootipColor("error");
      setTootipContent("존재하지 않는 방입니다.");
    }
  };

  const onVisibleChange: TooltipOnVisibleChange = (e) => {
    if (e) {
      setTootipColor("invert");
      setTootipContent("Enter로 입장하세요.");
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Plait에 오신걸 환영합니다! - Plait</title>
      </Head>
      <ScreenSaver />
      <S.Container>
        <S.Content>
          <S.Title>Plait에 오신걸 환영합니다!</S.Title>
          <S.Subtitle>
            <div>현재 123명이 Plait을 사용중입니다.</div>
            <div>사람들과 실시간으로 음악과 동영상을 공유해보세요.</div>
          </S.Subtitle>
          <S.BottomContainer>
            <Tooltip
              content={tootipContent}
              color={tootipColor}
              rounded
              placement="bottom"
              trigger="click"
              visible={tooltipVisible}
              onVisibleChange={onVisibleChange}
            >
              <S.CodeInput
                maxLength={6}
                onClick={(e) => e.stopPropagation()}
                value={code}
                onChange={onCodeChange}
                placeholder="코드를 입력해주세요..."
                onKeyDown={onKeyDown}
              />
            </Tooltip>
            <S.Or>또는</S.Or>
            <S.NewRoom>
              <Link href="/">방 생성하기</Link>
            </S.NewRoom>
          </S.BottomContainer>
        </S.Content>
      </S.Container>
    </Fragment>
  );
};

export default MainContainer;
