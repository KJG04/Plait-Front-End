import styled from "@emotion/styled";
import Image from "next/image";

export const Container = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  margin: none;
  display: flex;
  transition: background-color 0.15s ease-in-out;
  background-color: transparent;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;

export const Img = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
`;
