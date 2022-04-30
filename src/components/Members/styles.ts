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
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.close {
    transform: translateY(-100%);
  }
`;
