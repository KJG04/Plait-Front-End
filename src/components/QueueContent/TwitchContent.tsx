import QueueContentView, {
  QueueContentViewPropsType,
} from "@components/QueueContentView";
import { Content } from "@types";
import { FC, useCallback } from "react";
import { TwitchPlaceHolder } from "@images";
import { useDeleteContentMutation } from "@queries";
import { useRoomContext } from "@hooks";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const TwitchContent: FC<PropsType> = (props) => {
  const { contentId, uuid, user } = props.data;
  const [mutate] = useDeleteContentMutation();
  const room = useRoomContext();

  const onDelete = useCallback(() => {
    mutate({ variables: { roomCode: room.code, uuid } });
  }, [mutate, room?.code, uuid]);

  const prop: QueueContentViewPropsType = {
    title: `${contentId}의 생방송`,
    description: "twitch 생방송",
    userName: user.name,
    isPlaying: props.isPlaying,
    src: TwitchPlaceHolder,
    onDelete,
  };

  return <QueueContentView {...prop} />;
};

export default TwitchContent;
