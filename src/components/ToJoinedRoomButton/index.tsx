import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJoinedRoom } from "@queries/main";
import * as S from "./styles";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ToJoinedRoomButton = () => {
  const { data, loading, error } = useJoinedRoom();

  if (error || loading) {
    return <></>;
  }

  return (
    <Link href={`/${data.joinedRoom.code}`} passHref>
      <S.Button>
        이전에 참여했던 {data.joinedRoom.code}방에 참여하기
        <FontAwesomeIcon icon={faAngleRight} fixedWidth />
      </S.Button>
    </Link>
  );
};

export default ToJoinedRoomButton;
