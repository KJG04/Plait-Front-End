import styled from "@emotion/styled";
import Image from "next/image";

export const Container = styled.button`
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
  position: relative;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.grayscale.gray};
  }

  &:hover .delete {
    visibility: visible;
    opacity: 1;
  }
`;

export const Img = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.lightGray};
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
`;

export const Content = styled.div`
  display: -webkit-box;
  height: calc(1.2rem * 2);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font: ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0px;
`;

export const Name = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.darkWhite};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Playing = styled.div`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.primary};
`;

export const DeleteContainer = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 5px;
  padding: 4px;
  top: 15px;
  left: 15px;
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0;

  &:hover {
    filter: brightness(1.5);
  }
`;
