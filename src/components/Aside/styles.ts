import styled from "@emotion/styled";

export const Outer = styled.div`
  position: relative;
  height: 100%;
  width: 450px;
  transition: width 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: width;

  &.close {
    width: 0px;
  }
`;

export const Container = styled.aside`
  padding: 36px 10px 0px 10px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 450px;
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

export const Line = styled.hr`
  color: ${({ theme }) => theme.colors.grayscale.gray};
  margin: 0px 10px;
`;

export const TextButton = styled.button`
  padding: none;
  margin: none;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  font: ${({ theme }) => theme.fonts.body2};
  transition: color 0.15s ease-in-out;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.grayscale.white};
  }
`;

export const MemberHeader = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  margin: none;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  align-items: center;
  width: 100%;
`;

export const HeaderWrapper = styled(MemberHeader)`
  padding: 0px 8px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  overflow: scroll;
  flex: 1;
  padding-bottom: 16px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const Link = styled.input`
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  color: ${({ theme }) => theme.colors.grayscale.white};
  flex: 1;
`;

export const Copy = styled.button`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  aspect-ratio: 1 / 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  transition: background-color 0.2s ease-in-out;
  will-change: background-color;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
  }
`;

export const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateX(-100%);
  padding: 26px 0px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  opacity: 0;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: opacity, left, transform;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }

  &:focus-visible,
  &.hover {
    left: calc(100% + 28px);
    transform: translateX(0%);
    opacity: 1;
  }

  & .icon {
    transform: rotate(-180deg);
    transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    will-change: transform;
  }
  &.close .icon {
    transform: rotate(0deg);
  }
`;

export const LeaveContainer = styled.div`
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  filter: drop-shadow(0px 0px 5px #00000030);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 300px;
  text-align: center;
`;

export const LeaveButton = styled.button`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.grayscale.white};
  border-radius: 10px;
  width: 100%;
  text-align: center;
  transition: filter 0.2s ease-in-out;

  &:hover,
  &:focus-visible {
    filter: brightness(1.2);
  }
`;
