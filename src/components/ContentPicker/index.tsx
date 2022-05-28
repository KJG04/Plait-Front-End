import { FC, memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { Youtube as YoutubeLogo, SoundCloud as SoundCloudLogo } from "@images";
import Image from "next/image";
import { Modal } from "@nextui-org/react";

type LinkState = "EMPTY" | "SOUNDCLOUD" | "YOUTUBE" | "ERROR";

interface PropsType {
  open: boolean;
  onClose: () => void;
}

const ContentPicker: FC<PropsType> = (props) => {
  const { open, onClose } = props;
  const [link, setLink] = useState<string>("");
  const [linkState, setLinkState] = useState<LinkState>("EMPTY");
  const [soundCloudId, setSoundCloudId] = useState<number | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);

  const getContent = useCallback(() => {
    if (link.length <= 0) {
      setLinkState("EMPTY");
      return;
    }

    if (link.includes("youtube")) {
      try {
        const src = new URL(link);

        const id = src.searchParams.get("v");
        console.log(id);

        if (id === null) {
          setLinkState("ERROR");
          return;
        }

        setYoutubeId(id);
        setLinkState("YOUTUBE");
        console.log(id);
      } catch (error) {
        setLinkState("ERROR");
      }
      return;
    }

    if (link.includes("iframe")) {
      try {
        const i = link.indexOf("src");
        const l1 = link.substring(i, link.length);
        const i2 = l1.indexOf(">");
        const l2 = l1.substring(0, i2);
        const i3 = l2.indexOf(`"`);
        const src = new URL(l2.substring(i3, l2.length).replaceAll(`"`, ""));

        const url = src.searchParams.get("url");

        if (!url) {
          setLinkState("ERROR");
          return;
        }

        const src1 = new URL(url);
        const paths = src1.pathname.split("/");

        const id = Number(paths[paths.length - 1]);

        if (id === NaN) {
          setLinkState("ERROR");
          return;
        }

        setSoundCloudId(id);
        setLinkState("SOUNDCLOUD");
      } catch (error) {
        setLinkState("ERROR");
      }
      return;
    }

    setLinkState("ERROR");
  }, [link]);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <Modal
      open={open}
      closeButton
      onClose={onClose}
      style={{
        textAlign: "left",
        padding: "0",
        backgroundColor: "transparent",
      }}
      preventClose
      noPadding
      autoMargin
      width={
        ["SOUNDCLOUD", "YOUTUBE"].includes(linkState)
          ? "calc(60% + 48px)"
          : "calc(400px + 48px)"
      }
    >
      <S.Container>
        <S.TitleContainer>
          <S.Title>컨텐츠 추가</S.Title>
          {["SOUNDCLOUD", "YOUTUBE"].includes(linkState) && (
            <S.Button>
              {linkState === "SOUNDCLOUD" && (
                <Image
                  src={SoundCloudLogo}
                  alt="sound cloud"
                  height={30}
                  width={30}
                  objectFit="contain"
                />
              )}
              {linkState === "YOUTUBE" && (
                <Image
                  src={YoutubeLogo}
                  alt="youtube"
                  height={30}
                  width={60}
                  objectFit="contain"
                />
              )}
              <span>추가하기</span>
            </S.Button>
          )}
        </S.TitleContainer>
        <S.Subtitle>링크 입력</S.Subtitle>
        <S.LinkInput
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="링크를 입력해주세요..."
        />
        {linkState === "ERROR" && (
          <S.Error>유효한 링크를 입력해주세요.</S.Error>
        )}
        {linkState === "SOUNDCLOUD" && (
          <S.IFrame
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundCloudId}`}
          />
        )}
        {linkState === "YOUTUBE" && (
          <S.Youtube src={`https://www.youtube.com/embed/${youtubeId}`} />
        )}
      </S.Container>
    </Modal>
  );
};

export default memo(ContentPicker);
