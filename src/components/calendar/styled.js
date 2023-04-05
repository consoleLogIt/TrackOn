import styled from "styled-components";
import { black, greyBorder } from "../../colors";

export const CalendarContainerStyled = styled.div`
border: 2px solid ${greyBorder};
flex-grow: 1;
display: flex;
flex-direction:column;
`

export const CalendarHeaderStyled = styled.div`
padding: 1rem;
display: flex;
gap:3rem;
align-items: center;
`

export const CalendarDaysWrapperStyled = styled.div`
display: grid;
grid-template-columns: ${({day})=>day?"1fr":"repeat(7, 1fr)"};
flex:1;
`


