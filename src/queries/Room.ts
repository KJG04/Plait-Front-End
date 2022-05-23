import { gql } from "@apollo/client";

export const checkCanJoinRoomQuery = gql`
  query CanJoinRoom($roomCode: String!) {
    checkCanJoinRoom(roomCode: $roomCode)
  }
`;
