import { memo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { Youtube as YoutubeLogo, SoundCloud as SoundCloudLogo } from "@images";
import Image from "next/image";

type LinkState = "EMPTY" | "SOUNDCLOUD" | "YOUTUBE" | "ERROR";

const ContentPicker = () => {
  const [link, setLink] = useState<string>("");
  // const link = `<ifram e width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1159332526&color=%2374643c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></ifram><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/l2share78" title="L2Share♫78" target="_blank" style="color: #cccccc; text-decoration: none;">L2Share♫78</a> · <a href="https://soundcloud.com/l2share78/sokodomo-feat-ziont-prod-slom-10-episode-2" title="sokodomo (소코도모) - 회전목마 (Feat. Zion.T, 원슈타인) (Prod. Slom) (쇼미더머니 10 Episode 2)" target="_blank" style="color: #cccccc; text-decoration: none;">sokodomo (소코도모) - 회전목마 (Feat. Zion.T, 원슈타인) (Prod. Slom) (쇼미더머니 10 Episode 2)</a></div>`;
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
      {linkState === "ERROR" && <S.Error>유효한 링크를 입력해주세요.</S.Error>}
      {linkState === "SOUNDCLOUD" && (
        <S.IFrame
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundCloudId}`}
        />
      )}
      {linkState === "YOUTUBE" && (
        <S.Youtube src={`https://www.youtube.com/embed/${youtubeId}`} />
      )}
    </S.Container>
  );
};

export default memo(ContentPicker);
