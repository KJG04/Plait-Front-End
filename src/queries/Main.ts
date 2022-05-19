import { gql, useLazyQuery } from "@apollo/client";

const useRoomExists = () => {
  const query = gql`
    query RoomExist($roomCode: String!) {
      checkIsRoomExist(roomCode: $roomCode)
    }
  `;

  return useLazyQuery(query);
};

export { useRoomExists };
