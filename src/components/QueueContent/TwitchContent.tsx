import QueueContentView, {
  QueueContentViewPropsType,
} from "@components/QueueContentView";
import { Content } from "@types";
import { FC } from "react";
import { TwitchPlaceHolder } from "@images";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const TwitchContent: FC<PropsType> = (props) => {
  const { contentId, uuid, user } = props.data;

  const prop: QueueContentViewPropsType = {
    title: `${contentId}의 생방송`,
    description: "twitch 생방송",
    uuid,
    userName: user.name,
    isPlaying: props.isPlaying,
    src: TwitchPlaceHolder,
  };

  return <QueueContentView {...prop} />;
};

export default TwitchContent;
