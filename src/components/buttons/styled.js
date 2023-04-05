import styled from "styled-components";
import { black, greyBorder, greyDark, greyLight } from "../../colors";

export const ButtonContainerStyled = styled.button`
display:flex;
gap: .5rem;
align-items: center;
padding: ${({composition})=>composition==="icon"?".7rem" :".7rem 1rem"};
font-size:1.5rem;
outline: none;
border: none;
background-color: ${({bgColor})=>bgColor||greyDark};
color: ${({textColor})=>textColor||black};

border-radius: 4px;
cursor:pointer;
&:hover{
    opacity: .5;
}
`
