import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  margin: none;
  display: flex;
  transition: background-color 0.15s ease-in-out;
  background-color: transparent;
  width: 100%;
  max-width: 100%;
  min-width: 0px;
  user-select: none;
`;

export const Img = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 8px;
  min-width: 0px;
  height: 100%;
`;

export const Header = styled.div`
  overflow: hidden;
  display: block;
`;

export const Title = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.white};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  color: transparent;
`;

export const Content = styled.span`
  font: ${({ theme }) => theme.fonts.description};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  color: transparent;
`;

export const ContentWrapper = styled.div`
  margin-bottom: 2px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0px;
`;

export const Name = styled.span`
  font: ${({ theme }) => theme.fonts.body2};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray};
  color: transparent;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Playing = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.primary};
`;
