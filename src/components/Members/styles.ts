import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  padding: 24px;
  top: 0px;
  right: 0px;
  width: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  gap: 8px;
`;

export const Profile = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
  border-radius: 50%;
`;
