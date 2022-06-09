import styled from "@emotion/styled";

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

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  overflow: scroll;
  flex: 1;
  padding-bottom: 16px;
`;

export const Line = styled.hr`
  color: ${({ theme }) => theme.colors.grayscale.gray};
  margin: 0px 10px;
`;

export const Message = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  font: ${({ theme }) => theme.fonts.body2};
`;
