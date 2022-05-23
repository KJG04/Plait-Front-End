import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
`;

export const Title = styled.span`
  font: ${({ theme }) => theme.fonts.heading1};
  font-size: 144px;
  color: ${({ theme }) => theme.colors.grayscale.white};
`;

export const Content = styled.span`
  font: ${({ theme }) => theme.fonts.subtitle};
  color: ${({ theme }) => theme.colors.grayscale.lightGray};
  font-size: 48px;
  font-weight: 500;
`;

export const Move = styled.a`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  will-change: color;
  margin-top: 28px;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.grayscale.white};
  }
`;
