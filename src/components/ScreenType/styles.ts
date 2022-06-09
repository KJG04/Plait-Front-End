import styled from "@emotion/styled";

export const Container = styled.button`
  padding: 4px;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;
