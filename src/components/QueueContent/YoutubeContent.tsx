import { FC, memo, useCallback } from "react";
import { Content } from "@types";
import {
  useDeleteContentMutation,
  usePlayTimeMutation,
  useYoutubeContentDetail,
} from "@queries";
import { QueueContentView, QueueContentSkeleton } from "@components";
import { QueueContentViewPropsType } from "@components/QueueContentView";
import { useRoomContext } from "@hooks";
import { forcePlayTimeVar, playTimeVar } from "@stores";

interface PropsType {
  data: Content;
  isPlaying: boolean;
}

const YoutubeContent: FC<PropsType> = (props) => {
  const { contentId, user } = props.data;
  const src = `https://img.youtube.com/vi/${contentId}/default.jpg`;
  const { data, isLoading, isError } = useYoutubeContentDetail(contentId);
  const [mutate] = useDeleteContentMutation();
  const room = useRoomContext();
  const [playTimeMutate] = usePlayTimeMutation();

  const onDelete = useCallback(async () => {
    await mutate({ variables: { roomCode: room.code, uuid: props.data.uuid } });
    await playTimeMutate({
      variables: {
        roomCode: room.code,
        playTime: 0,
        force: true,
      },
    });
    playTimeVar(0);
    forcePlayTimeVar(0);
  }, [mutate, playTimeMutate, props.data.uuid, room.code]);

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
    onDelete,
  };

  return <QueueContentView {...prop} />;
};
export default memo(YoutubeContent);
