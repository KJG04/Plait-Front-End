import styled from "@emotion/styled";

export const Container = styled.aside`
  padding: 36px 10px 0px 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 450px;
  height: 100vh;
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

export const Leave = styled.button`
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

export const MemberHeader = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  margin: none;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  align-items: center;
  width: 100%;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
    color: ${({ theme }) => theme.colors.grayscale.white};
  }
`;

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  overflow: scroll;
  flex: 1;
  padding: 16px 0px;
`;
