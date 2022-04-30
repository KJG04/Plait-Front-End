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
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: scroll;
  gap: 8px;
  flex-wrap: wrap;
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
