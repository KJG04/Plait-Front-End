import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import * as S from "./styles";

const ScreenType = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const onClick = () => {
    setIsFullScreen((prev) => {
      const now = !prev;

      if (now) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }

      return now;
    });
  };

  return (
    <Tooltip
      color="invert"
      content={isFullScreen ? "전체화면 종료" : "전체화면"}
    >
      <S.Container onClick={onClick}>
        <FontAwesomeIcon
          size="1x"
          fixedWidth
          icon={isFullScreen ? faCompress : faExpand}
        />
      </S.Container>
    </Tooltip>
  );
};

export default ScreenType;
