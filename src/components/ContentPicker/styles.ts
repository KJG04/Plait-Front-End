import styled from "@emotion/styled";
import Input from "../Input";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.black};
  border-radius: 20px;
  padding: 24px;
  padding-top: 48px;
`;

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.grayscale.white};
`;

export const Subtitle = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  margin-bottom: 8px;
`;

export const LinkInput = styled(Input)`
  min-width: 400px;
  display: block;
  width: 100%;
`;

export const IFrame = styled.iframe`
  width: 100%;
  border-radius: 10px;
  margin-top: 16px;
  width: 60vw;
`;

export const Error = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 12px 0px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.white};
  text-align: center;
`;

export const Youtube = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  margin-top: 16px;
  width: 60vw;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  border-radius: 10px;
  padding: 8px;
  transition: background-color 0.2s ease-in-out;
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.white};
  align-items: center;
  display: flex;
  justify-content: center;
  column-gap: 12px;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;
