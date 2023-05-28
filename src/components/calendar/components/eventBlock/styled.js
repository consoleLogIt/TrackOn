import styled from "styled-components";
import { eventColors } from "../../../../colors";






export const EventContainerStyled = styled.div`
  position: absolute;
  height: ${({ height }) => height + "rem"};
  top: ${({ top }) => top + "rem"};
  background-color: ${({color})=>eventColors[color]};
  z-index: 4;
  border-radius: 2px;
  color: white;
  align-self: end;
  width: 80%;
  padding: 0 0.5rem;
  border: 2px solid ${({color})=>eventColors[color]};
  /* box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2); */

`;

export const EventTitleStyled = styled.div`
font-size:1.2rem;
`;

export const EventTimeStyled = styled.div`
font-size:1.2rem;

`;
