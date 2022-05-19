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
  column-gap: 16px;
`;
