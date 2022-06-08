import { useReactiveVar } from "@apollo/client";
import { useRoomContext } from "@hooks";
import { useDeleteContentMutation } from "@queries/content";
import { usePlayTimeMutation } from "@queries/room";
import { durationVar, forcePlayTimeVar, playTimeVar } from "@stores";
import { Content } from "@types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import * as S from "./styles";

interface PropsType {
  content: Content;
}

const YoutubePlayer: FC<PropsType> = (props) => {
  const room = useRoomContext();
  const { contentId, uuid } = props.content;
  const ref = useRef<YouTube>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);
  const [mutate] = useDeleteContentMutation();
  const [playTimeMutate] = usePlayTimeMutation();
  const forcePlayTime = useReactiveVar(forcePlayTimeVar);
  const [first, setFirst] = useState<boolean>(true);

  const onEnd = useCallback(async () => {
    await mutate({ variables: { roomCode: room.code, uuid } });
    await playTimeMutate({
      variables: {
        roomCode: room.code,
        playTime: 0,
        force: true,
      },
    });
    playTimeVar(0);
    forcePlayTimeVar(0);
  }, [mutate, playTimeMutate, room.code, uuid]);

  const onIsPlayingUpdate = useCallback(async () => {
    if (room.isPlaying) {
      await ref.current?.internalPlayer.playVideo();
      return;
    } else {
      await ref.current?.internalPlayer.pauseVideo();
    }
  }, [room.isPlaying]);

  const onReady = async (e: YouTubeEvent) => {
    await e.target.mute();
    await e.target.seekTo(room.playTime / 1000, true);
    if (room.isPlaying) {
      await e.target.playVideo();
    } else {
      await e.target.pauseVideo();
    }
    await e.target.setPlaybackQuality("default");

    const dur = await ref.current?.internalPlayer.getDuration();
    durationVar(dur * 1000);

    setReady(true);
  };

  const onContainerClick = () => {
    ref.current?.internalPlayer.unMute();
    setMute(false);
  };

  useEffect(() => {
    onIsPlayingUpdate();
  }, [onIsPlayingUpdate]);

  useEffect(() => {
    if (!first) {
      ref.current?.internalPlayer.seekTo(forcePlayTime / 1000, true);
    } else {
      setFirst(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcePlayTime]);

  const intervalPlayTimeUpdate = useCallback(async () => {
    if (ref.current) {
      const cur = await ref.current.internalPlayer.getCurrentTime();

      const milli = cur * 1000;

      playTimeMutate({
        variables: { roomCode: room.code, playTime: milli, force: false },
      });
    }
  }, [playTimeMutate, room.code]);

  const updatePlayTime = async () => {
    if (ref.current) {
      const cur = await ref.current.internalPlayer.getCurrentTime();

      const milli = cur * 1000;
      playTimeVar(milli);
    }
  };

  useEffect(() => {
    const interval = setInterval(updatePlayTime, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (room.isPlaying) {
      const mutateInterval = setInterval(intervalPlayTimeUpdate, 1000);

      return () => {
        clearInterval(mutateInterval);
      };
    }
  }, [intervalPlayTimeUpdate, room.isPlaying]);

  return (
    <>
      <S.YoutubeContainer>
        <YouTube
          ref={ref}
          style={{ flex: 1, display: "flex" }}
          videoId={contentId}
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              modestbranding: 1,
              origin: typeof window === "undefined" ? "" : window.location.href,
            },
          }}
          onReady={onReady}
          onEnd={onEnd}
        />
      </S.YoutubeContainer>
      {ready && mute && (
        <S.Cover onClick={onContainerClick}>
          클릭으로 음소거를 해제해주세요.
        </S.Cover>
      )}
    </>
  );
};

export default YoutubePlayer;
