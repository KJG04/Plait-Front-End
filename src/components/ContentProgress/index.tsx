import { useRoomContext } from "@hooks";
import { ContentType } from "@types";
import { memo } from "react";
import NoControllProgress from "./NoControllProgress";
import YoutubeControllProgress from "./YoutubeControllProgress";

const ContentProgress = () => {
  const room = useRoomContext();

  if (room.contents.length <= 0) {
    return <NoControllProgress percent={0} />;
  }

  const cur = room.contents[0];

  if (cur.contentType === ContentType.TWITCH) {
    return <NoControllProgress percent={100} />;
  }

  if (cur.contentType === ContentType.YOUTUBE) {
    return <YoutubeControllProgress />;
  }

  return <NoControllProgress percent={100} />;
};

export default memo(ContentProgress);
