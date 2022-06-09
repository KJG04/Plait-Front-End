import { queryKeys } from "@constant";
import { getYoutubeContentDetail } from "@apis";
import { useQuery } from "react-query";
import { gql, useMutation } from "@apollo/react-hooks";

const useYoutubeContentDetail = (id: string) =>
  useQuery([queryKeys.youtubeContentDetail, id], () =>
    getYoutubeContentDetail(id),
  );

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

const useAddContentMutation = () => {
  return useMutation(addContentMutation);
};

const useDeleteContentMutation = () => {
  return useMutation(deleteContentMutation);
};

export {
  useYoutubeContentDetail,
  useAddContentMutation,
  useDeleteContentMutation,
};
