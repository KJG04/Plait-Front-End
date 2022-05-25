import { gql } from "@apollo/client";
import { useMutation, useSubscription } from "@apollo/react-hooks";

export const checkCanJoinRoomQuery = gql`
  query CanJoinRoom($roomCode: String!) {
    checkCanJoinRoom(roomCode: $roomCode)
  }
`;

const useListeningRoom = (roomCode: string) => {
  const subQuery = gql`
    subscription ListeningRoom($roomCode: String!) {
      listening(roomCode: $roomCode)
    }
  `;

  return useSubscription(subQuery, {
    variables: { roomCode },
  });
};

const useAfterListening = () => {
  const completeMutation = gql`
    mutation AfterListening($roomCode: String!) {
      afterListening(roomCode: $roomCode)
    }
  `;

  return useMutation(completeMutation);
};

export { useListeningRoom, useAfterListening };
