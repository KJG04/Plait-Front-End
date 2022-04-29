import { NextPage } from "next";
import Aside from "../../components/Aside";
import BottomBar from "../../components/BottomBar";
import Members from "../../components/Members";
import Player from "../../components/Player";
import * as S from "./styles";

const RoomContainer: NextPage = () => {
  return (
    <S.Container>
      <S.TopContainer>
        <Aside />
        <Player />
      </S.TopContainer>
      <BottomBar />
      <Members />
    </S.Container>
  );
};

export default RoomContainer;
