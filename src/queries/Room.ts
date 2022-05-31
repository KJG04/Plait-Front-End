import { gql, useMutation, useQuery } from "@apollo/client";

const checkCanJoinRoomQuery = gql`
  query CanJoinRoom($roomCode: String!) {
    checkCanJoinRoom(roomCode: $roomCode)
  }
`;

const getRoomQuery = gql`
  query Room($roomCode: String!) {
    room(roomCode: $roomCode) {
      code
      isPlaying
      playTime
      users {
        uuid
        name
        color
        isListening
      }
      contents {
        uuid
        contentId
        contentType
        user {
          name
        }
      }
    }
  }
`;

const postAliveMutation = gql`
  mutation AliveInterval($roomCode: String!) {
    listeningInterval(roomCode: $roomCode)
  }
`;

const useRoom = (roomCode: string) =>
  useQuery(getRoomQuery, { variables: { roomCode }, pollInterval: 1000 * 60 });

const useAlive = (roomCode: string) =>
  useMutation(postAliveMutation, { variables: { roomCode } });

export { getRoomQuery, checkCanJoinRoomQuery, useRoom, useAlive };
