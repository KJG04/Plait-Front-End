import styled from "@emotion/styled";
import Input from "../../components/Input";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
`;

export const Content = styled.main`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: all;
`;

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.grayscale.white};
  text-align: center;
`;

export const Subtitle = styled.div`
  font: ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  text-align: center;
  margin-top: 16px;
`;

export const CodeInput = styled(Input)`
  text-align: center;
`;

export const BottomContainer = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  row-gap: 16px;
`;

export const Or = styled.div`
  font: ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
`;

export const NewRoom = styled.button`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  text-align: center;
  transition: color 0.15s ease-in-out;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.grayscale.white};
  }
`;
