import { useRoomContext } from "@hooks";
import { Content } from "@types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import * as S from "./styles";

interface PropsType {
  content: Content;
}

const YoutubePlayer: FC<PropsType> = (props) => {
  const room = useRoomContext();
  const { contentId } = props.content;
  const ref = useRef<YouTube>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);

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
    if (room.isPlaying) {
      await e.target.playVideo();
    } else {
      await e.target.pauseVideo();
    }
    await e.target.setPlaybackQuality("hd1080");
    setReady(true);
  };

  const onContainerClick = () => {
    ref.current?.internalPlayer.unMute();
    setMute(false);
  };

  useEffect(() => {
    onIsPlayingUpdate();
  }, [onIsPlayingUpdate]);

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
