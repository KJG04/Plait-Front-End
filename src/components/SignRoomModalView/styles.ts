import styled from "@emotion/styled";
import ButtonWithLoading from "../ButtonWithLoading";

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.grayscale.white};
  text-align: left;
  margin-bottom: 36px;
`;

export const Container = styled.div`
  padding: 4px 24px 24px 24px;
  text-align: left;
`;

export const NameLabel = styled.div`
  font: ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.grayscale.lightGray};
  margin-bottom: 8px;
`;

export const Button = styled(ButtonWithLoading)`
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  color: ${({ theme }) => theme.colors.grayscale.white};
  transition: all 0.2s ease-in-out;
  will-change: color, background-color;
  border-radius: 10px;
  padding: 8px 0px;
  width: 150px;
  text-align: center;
  margin-top: 16px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
    color: ${({ theme }) => theme.colors.grayscale.lightGray};
  }
`;
