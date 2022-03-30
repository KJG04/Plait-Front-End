import styled from "@emotion/styled";
import Input from "../../components/Input";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  margin-top: 28px;
`;
