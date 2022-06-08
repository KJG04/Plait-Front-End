import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

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

const subscriptionRoom = gql`
  subscription SubscriptionRoom($roomCode: String!) {
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

const useRoom = (roomCode: string) =>
  useQuery(getRoomQuery, { variables: { roomCode }, pollInterval: 1000 * 60 });

const useAlive = (roomCode: string) =>
  useMutation(postAliveMutation, { variables: { roomCode } });

const useRoomSubscription = (roomCode: string) =>
  useSubscription(subscriptionRoom, { variables: { roomCode } });

const addContentMutation = gql`
  mutation AddContent(
    $roomCode: String!
    $contentId: String!
    $type: ContentType!
  ) {
    addContent(roomCode: $roomCode, contentId: $contentId, type: $type)
  }
`;

const deleteContentMutation = gql`
  mutation DeleteContent($roomCode: String!, $uuid: String!) {
    deleteContent(roomCode: $roomCode, uuid: $uuid)
  }
`;

const useContentMutation = () => {
  const addContent = useMutation(addContentMutation);
  const deleteContent = useMutation(deleteContentMutation);

  return { addContent, deleteContent };
};

const isPlayingMutateion = gql`
  mutation IsPlayingMutation($roomCode: String!, $condition: Boolean!) {
    isContentPlaying(roomCode: $roomCode, condition: $condition)
  }
`;

const useIsPlayingMutation = () => useMutation(isPlayingMutateion);

const playTimeMutation = gql`
  mutation PlayTimeMutation(
    $roomCode: String
    $playTime: Int!
    $force: Boolean!
  ) {
    updatePlayTime(roomCode: $roomCode, playTime: $playTime, force: $force)
  }
`;

const playTimeSubsciption = gql`
  subscription PlayTimeSubsciption($roomCode: String!) {
    playTime(roomCode: $roomCode)
  }
`;

const usePlayTimeMutation = () => useMutation(playTimeMutation);
const usePlayTime = () => useSubscription(playTimeSubsciption);

export {
  getRoomQuery,
  checkCanJoinRoomQuery,
  useRoom,
  useAlive,
  useRoomSubscription,
  useContentMutation,
  useIsPlayingMutation,
  usePlayTimeMutation,
  usePlayTime,
};
