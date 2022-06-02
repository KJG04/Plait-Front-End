import { FC, memo } from "react";
import { Content } from "@types";
import { useYoutubeContentDetail } from "@queries";
import { QueueContentView, QueueContentSkeleton } from "@components";
import { QueueContentViewPropsType } from "@components/QueueContentView";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const YoutubeContent: FC<PropsType> = (props) => {
  const { contentId, user } = props.data;
  const src = `https://img.youtube.com/vi/${contentId}/maxresdefault.jpg`;

  const { data, isLoading, isError } = useYoutubeContentDetail(contentId);

  if (isLoading) {
    return <QueueContentSkeleton />;
  }

  if (isError) {
    return <></>;
  }

  if (!data) {
    return <QueueContentSkeleton />;
  }

  const prop: QueueContentViewPropsType = {
    isPlaying: props.isPlaying,
    title: data.data.items[0].snippet.title,
    userName: user.name,
    src,
    description: data.data.items[0].snippet.description,
    uuid: props.data.uuid,
  };

  return <QueueContentView {...prop} />;
};
export default memo(YoutubeContent);
