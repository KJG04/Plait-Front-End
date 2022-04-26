import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  height: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayscale.gray};
`;

export const Inner = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

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

  &:hover {
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.8);
  }
`;

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
