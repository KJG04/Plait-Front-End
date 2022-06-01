import QueueContentView from "@components/QueueContentView";
import { useYoutubeContentDetail } from "@queries";
import { Content } from "@types";
import { FC } from "react";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const YoutubeContent: FC<PropsType> = (props) => {
  const { contentId, user } = props.data;
  const src = `https://img.youtube.com/vi/${contentId}/maxresdefault.jpg`;

  const { data, isLoading, isError } = useYoutubeContentDetail(contentId);

  if (isLoading || isError || !data) {
    return <></>;
  }

  const prop = {
    src,
    title: data.data.items[0].snippet.title,
    description: data.data.items[0].snippet.description,
    userName: user.name,
    isPlaying: props.isPlaying,
  };

  return <QueueContentView {...prop} />;
};

export default YoutubeContent;
