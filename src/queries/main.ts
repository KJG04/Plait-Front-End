import { gql, useLazyQuery } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const roomExistsQuery = gql`
  query RoomExist($roomCode: String!) {
    checkIsRoomExist(roomCode: $roomCode)
  }
`;

const useRoomExists = () => {
  return useLazyQuery(roomExistsQuery);
};

const useSignRoomMutation = () => {
  const join = gql`
    mutation JoinRoom($roomCode: String!, $name: String!) {
      joinRoom(roomCode: $roomCode, name: $name)
    }
  `;

  const create = gql`
    mutation CreateRoom($name: String!) {
      createRoom(name: $name) {
        code
      }
    }
  `;

  const joinMutation = useMutation(join);
  const createMutation = useMutation(create);

  return { joinMutation, createMutation };
};

const useActiveUserCount = () => {
  const activeUser = gql`
    query {
      activeUserCount
    }
  `;

  return useQuery(activeUser, { pollInterval: 5000 });
};

export { useRoomExists, useSignRoomMutation, useActiveUserCount };
