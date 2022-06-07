import styled from "@emotion/styled";

export const YoutubeContainer = styled.div`
  display: flex;
  flex: 1;
  iframe {
    flex: 1;
    height: unset;
    pointer-events: none;
  }
`;

export const Cover = styled.div`
  background-color: #00000099;
  font: ${({ theme }) => theme.fonts.subtitle};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Container = styled.div`
  position: relative;
`;
