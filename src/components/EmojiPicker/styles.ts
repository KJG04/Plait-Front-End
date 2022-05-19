import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 16px;
  height: 400px;
  position: absolute;
  bottom: 16px;
  left: 0px;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  box-shadow: 0px 0px 20px ${({ theme }) => theme.colors.grayscale.black};
  transform: translateX(-50%);
  bottom: 40px;
  border-radius: 10px;
  overflow: scroll;
  opacity: 1;
  pointer-events: all;
  visibility: visible;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.close {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) translateY(5%);
  }

  @media (max-width: 1500px) {
    position: fixed;
    transform: initial;
    right: 24px;
    left: initial;
    bottom: 50px;

    &.close {
      transform: translateY(5%);
    }
  }
`;

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.subtitle};
  color: ${({ theme }) => theme.colors.grayscale.white};
  margin-bottom: 12px;
`;

export const Description = styled.span`
  font: ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.grayscale.lightGray};
  margin-left: 12px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  margin-bottom: 12px;
`;

export const Subtitle = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  margin-bottom: 4px;
`;
