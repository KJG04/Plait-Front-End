import styled from "@emotion/styled";

export const PrograssWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  flex: 1;
`;

export const Time = styled.div`
  font: ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.grayscale.white};
`;

export const Progress = styled.input<{ percent: number }>`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 700px;
  position: relative;
  flex: 1;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
    height: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1px;
    height: 1px;
  }

  &:focus::-webkit-slider-thumb {
    outline: none;
  }

  &::-moz-range-track {
    background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
    height: 5px;
  }

  &::-moz-range-thumb {
    border: none;
    border-radius: 0;
    width: 1px;
    height: 1px;
    background-color: transparent;
  }

  &::after {
    transition: width 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: ${({ percent }) => percent}%;
    background-color: ${({ theme }) => theme.colors.grayscale.white};
    will-change: width;
  }
`;
