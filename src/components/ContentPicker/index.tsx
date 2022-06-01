import { FC, memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { Youtube as YoutubeLogo } from "@images";
import Image from "next/image";
import { Modal } from "@nextui-org/react";

type LinkState = "EMPTY" | "YOUTUBE" | "ERROR";

interface PropsType {
  open: boolean;
  onClose: () => void;
}

const ContentPicker: FC<PropsType> = (props) => {
  const { open, onClose } = props;
  const [link, setLink] = useState<string>("");
  const [linkState, setLinkState] = useState<LinkState>("EMPTY");
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

    setLinkState("ERROR");
  }, [link]);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <Modal
      open={open}
      closeButton
      onClose={() => {
        setLink("");
        setLinkState("EMPTY");
        onClose();
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
        linkState === "YOUTUBE" ? "calc(60% + 48px)" : "calc(400px + 48px)"
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
          <S.Youtube src={`https://www.youtube.com/embed/${youtubeId}`} />
        )}
      </S.Container>
    </Modal>
  );
};

export default memo(ContentPicker);
