import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 16px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.grayscale.white};
  text-align: center;
`;

export const Description = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.lightGray};
  text-align: center;
`;
