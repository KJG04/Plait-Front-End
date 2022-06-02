import { FC, memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { Youtube as YoutubeLogo } from "@images";
import Image from "next/image";
import { Modal } from "@nextui-org/react";

type LinkState = "EMPTY" | "YOUTUBE" | "TWITCH" | "ERROR";

interface PropsType {
  open: boolean;
  onClose: () => void;
}

const ContentPicker: FC<PropsType> = (props) => {
  const { open, onClose } = props;
  const [link, setLink] = useState<string>("");
  const [linkState, setLinkState] = useState<LinkState>("EMPTY");
  const [contentId, setContentId] = useState<string | null>(null);

  const getContent = useCallback(() => {
    if (link.length <= 0) {
      setLinkState("EMPTY");
      return;
    }

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link.match(regExp);
    const id = match && match[7].length == 11 ? match[7] : false;

    if (id) {
      setContentId(id);
      setLinkState("YOUTUBE");
      return;
    }

    if (link.startsWith("https://www.twitch.tv/")) {
      const url = new URL(link);

      const paths = url.pathname
        .trim()
        .split("/")
        .filter((value) => value.length > 0);

      if (paths.length > 0) {
        setContentId(paths[0]);
        setLinkState("TWITCH");
        return;
      }
    }
    setContentId(null);
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
      onOpen={() => {
        setLink("");
        setLinkState("EMPTY");
      }}
      style={{
        textAlign: "left",
        padding: "0",
        backgroundColor: "transparent",
      }}
      preventClose
      noPadding
      autoMargin
      width={
        ["YOUTUBE", "TWITCH"].includes(linkState)
          ? "calc(60% + 48px)"
          : "calc(400px + 48px)"
      }
    >
      <S.Container>
        <S.TitleContainer>
          <S.Title>컨텐츠 추가</S.Title>
          {linkState === "YOUTUBE" && (
            <S.Button>
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
        {linkState === "YOUTUBE" && (
          <S.Iframe src={`https://www.youtube.com/embed/${contentId}`} />
        )}
        {linkState === "TWITCH" && contentId && (
          <S.Twitch
            channel={contentId}
            hideControls
            parent={["localhost"]}
            allowFullscreen={false}
            width="100%"
            height="100%"
          />
        )}
      </S.Container>
    </Modal>
  );
};

export default memo(ContentPicker);
