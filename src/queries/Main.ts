import { gql, useLazyQuery, useMutation } from "@apollo/client";

const useRoomExists = () => {
  const query = gql`
    query RoomExist($roomCode: String!) {
      checkIsRoomExist(roomCode: $roomCode)
    }
  `;

  return useLazyQuery(query);
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

export { useRoomExists, useSignRoomMutation };
