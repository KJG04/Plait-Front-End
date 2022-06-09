import styled from "@emotion/styled";

export const PlayContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
  flex: 1;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const Button = styled.button`
  transition: opacity 0.2s ease-in-out,
    transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: opacity, transform;

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.8);
  }

  &:disabled {
    opacity: 0.3;

    &:active {
      transform: scale(1);
    }
  }
`;
