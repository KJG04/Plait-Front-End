import styled from "@emotion/styled";

export const Contianer = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  margin: none;
  display: flex;
  transition: background-color 0.15s ease-in-out;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grayscale.white};
  column-gap: 12px;
  align-items: center;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }
`;

export const Profile = styled.div`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
`;
