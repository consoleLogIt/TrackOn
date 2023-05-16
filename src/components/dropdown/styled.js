import styled from "styled-components";
import { greyBorder, greyDark } from "../../colors";

export const DropdownContainerStyled = styled.div`
  /* padding:1rem; */
  background-color: white;
  position: relative;
`;

export const DropdownSelectBoxStyled = styled.div`
border: 1px solid ${greyBorder};
border-radius: 4px;
font-size: 1.2rem;
cursor: pointer;
padding: .5rem 1rem;
`;

export const OptionsWrapperStyled = styled.div`
  position: absolute;
  background-color: white;
  width: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
  height: 17rem;
  overflow: auto;
  /* font-size: 1.2rem; */
`;

export const OptionsItemStyled = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  :hover {
    background-color: ${greyDark};
  }
`;
