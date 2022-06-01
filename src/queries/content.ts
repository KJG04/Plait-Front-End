import { queryKeys } from "@constant";
import { getYoutubeContentDetail } from "@apis";
import { useQuery } from "react-query";

const useYoutubeContentDetail = (id: string) =>
  useQuery([queryKeys.youtubeContentDetail, id], () =>
    getYoutubeContentDetail(id),
  );

export { useYoutubeContentDetail };
