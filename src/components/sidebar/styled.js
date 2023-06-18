import styled from "styled-components";
import { greyDark } from "../../colors";

export const SidebarContainerStyled = styled.div`
  padding: 2rem;
  background-color: ${greyDark};
  width: 20rem;
  z-index: 2;
  position: sticky;
  top: 0;
`;

export const SidebarHeaderStyled = styled.h3`
  font-size: ${({ fontSize }) => fontSize || "1.5rem"};
  margin: 0;
`;

export const SidebarBodyStyled = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
