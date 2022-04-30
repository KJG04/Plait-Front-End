import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const Button = styled.button`
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  font: ${({ theme }) => theme.fonts.heading3};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;
