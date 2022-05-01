import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const Emoji = styled.div`
  font: ${({ theme }) => theme.fonts.heading2};
  text-align: center;
`;

export const Name = styled.div`
  background-color: ${({ color }) => color};
  font: ${({ theme }) => theme.fonts.description};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.grayscale.white};
  padding: 0px 2px;
`;
