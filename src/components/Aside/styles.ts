import styled from "@emotion/styled";

export const Container = styled.aside`
  padding: 36px 10px 0px 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.darkGray};
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 450px;
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
