import { FC, memo } from "react";
import { Content, ContentType } from "@types";
import YoutubeContent from "./YoutubeContent";
import SoundCloudContent from "./SoundCloudContent";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const QueueContent: FC<PropsType> = (props) => {
  const { data, isPlaying } = props;

  if (data.contentType === ContentType.YOUTUBE) {
    return <YoutubeContent isPlaying={isPlaying} data={data} />;
  }

  if (data.contentType === ContentType.SOUNDCLOUD) {
    return <SoundCloudContent />;
  }

  return <></>;
};
export default memo(QueueContent);
