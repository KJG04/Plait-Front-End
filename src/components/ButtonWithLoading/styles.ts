import styled from "@emotion/styled";
import { Loading } from "@nextui-org/react";

export const LoadingContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const LoadingIcon = styled(Loading)`
  position: absolute;
  top: 100%;
  left: 50%;
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translate(-50%, 0%);

  &.active {
    transform: translate(-50%, -50%);
    top: 50%;
    opacity: 1;
  }
`;

export const Label = styled.div`
  transition: all 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 1;

  &.loading {
    transform: translateY(100%);
    opacity: 0;
  }
`;
