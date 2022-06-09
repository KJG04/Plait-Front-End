import { ApolloError } from "@apollo/client";
import { Tooltip } from "@nextui-org/react";
import { PersistedQueryNotFoundError } from "apollo-server-errors";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  JoinRoomModal,
  ScreenSaver,
  CreateRoomModal,
  ToJoinedRoomButton,
} from "@components";
import { useActiveUserCount, useRoomExists } from "@queries";
import * as S from "./styles";

const MainContainer: NextPage = () => {
  const [code, setCode] = useState<string>("");
  const [tootipContent, setTootipContent] =
    useState<string>("Enter로 입장하세요.");
  const [tootipColor, setTootipColor] = useState<"invert" | "error">("invert");
  const [getRoomIsExists, { loading }] = useRoomExists();
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [joiningRoomCode, setJoiningRoomCode] = useState<string | null>(null);
  const tooltipVisible = code.trim().length > 0;
  const { data } = useActiveUserCount();
  const router = useRouter();

  const onCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTootipColor("invert");
    setTootipContent("Enter로 입장하세요.");

    setCode(e.target.value);
  };

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

      if (!!error) {
        throw error;
      }

      setJoiningRoomCode(code);
      setJoinModalOpen(true);
    } catch (error) {
      setTootipColor("error");
      if (
        error instanceof ApolloError &&
        error.graphQLErrors[0].extensions.code ===
          new PersistedQueryNotFoundError().extensions.code
      ) {
        setTootipContent("방이 존재하지 않습니다.");
        return;
      }

      setTootipContent("오류 발생.");
    }
  };

  const onCreateClick = () => setCreateModalOpen(true);

  useEffect(() => {
    const code = router.query.join;

    if (!!!code || typeof code !== "string") {
      return;
    }

    setCode(code);
  }, [router.query]);

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
            <div>
              현재 {data ? data.activeUserCount : "-"}명이 Plait을 사용중입니다.
            </div>
            <div>사람들과 실시간으로 음악과 동영상을 공유해보세요.</div>
          </S.Subtitle>
          <S.BottomContainer>
            <Tooltip
              content={loading ? "로딩중..." : tootipContent}
              color={tootipColor}
              rounded
              placement="bottom"
              visible={tooltipVisible}
              initialVisible={tooltipVisible}
            >
              <S.CodeInput
                maxLength={6}
                value={code}
                onChange={onCodeChange}
                placeholder="코드를 입력해주세요..."
                onKeyDown={onKeyDown}
              />
            </Tooltip>
            <S.Or>또는</S.Or>
            <S.NewRoom onClick={onCreateClick}>방 생성하기</S.NewRoom>
          </S.BottomContainer>
        </S.Content>
      </S.Container>
      {!!joiningRoomCode && (
        <JoinRoomModal
          roomCode={joiningRoomCode}
          open={joinModalOpen}
          onClose={() => setJoinModalOpen(false)}
        />
      )}
      <CreateRoomModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <ToJoinedRoomButton />
    </Fragment>
  );
};

export default MainContainer;
