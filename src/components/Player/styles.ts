import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
`;

export const Text = styled.div`
  font: ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.grayscale.gray};
`;

export const Small = styled.div`
  font: ${({ theme }) => theme.fonts.heading1};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.grayscale.gray};
`;

export const NotFoundContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const YoutubeContainer = styled.div`
  display: flex;
  flex: 1;
  iframe {
    flex: 1;
    height: unset;
  }
  pointer-events: none;
`;
