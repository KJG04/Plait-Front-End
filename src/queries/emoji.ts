import { gql, useMutation, useSubscription } from "@apollo/client";

const listeningEmojiSubscription = gql`
  subscription ListeningEmoji($roomCode: String!) {
    listeningEmoji(roomCode: $roomCode) {
      emoji
      name
      color
      x
      y
    }
  }
`;

const popEmojiMutation = gql`
  mutation PopEmoji($roomCode: String!, $emoji: EmojiInput!) {
    popEmoji(roomCode: $roomCode, emoji: $emoji)
  }
`;

const useEmoji = (roomCode: string) =>
  useSubscription(listeningEmojiSubscription, { variables: { roomCode } });

const useEmojiMutation = () => useMutation(popEmojiMutation);

export { useEmoji, useEmojiMutation };
