import styled from "@emotion/styled";

export const Button = styled.a`
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  box-shadow: 0px 0px 20px #00000030;
  border-radius: 10px;
  padding: 16px;
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 1000;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;
