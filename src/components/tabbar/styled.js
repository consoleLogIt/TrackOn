import styled from "styled-components";
import { black, greyBorder, greyDark, greyDarker, white } from "../../colors";

export const TabbarContainerStyled = styled.div`
  display: flex;
  border: 2px solid ${greyBorder};
  border-radius: 4px;
`;

export const TabbarItem = styled.div`
  padding: 1rem 2rem;
  padding: ${({ S }) => (S ? ".5rem 1rem" : "1rem 2rem")};

  /* font-size:1.5rem; */
  font-size: ${({ S }) => (S ? "1.1rem" : "1.5rem")};
  color: ${({ active }) => (active ? white : greyDarker)};
  background-color: ${({ active }) => (active ? black : greyDark)};
  cursor: pointer;
`;
