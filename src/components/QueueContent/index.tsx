import { FC, memo } from "react";
import { Content, ContentType } from "@types";
import YoutubeContent from "./YoutubeContent";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const QueueContent: FC<PropsType> = (props) => {
  if (props.data.contentType === ContentType.YOUTUBE) {
    return <YoutubeContent {...props} />;
  }

  return <></>;
};
export default memo(QueueContent);
