import styled from "styled-components";
import { greyBorder } from "../../../../colors";

export const EventCreatorContainerStyled = styled.div`
  position: absolute;
  /* width: 20rem; */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  top: ${({ top }) => top + "px"};
  left: ${({ left }) => left + "px"};

  /* left: 50%; */
  background: white;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
`;

export const ChooseColorContainerStyled = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ColorItemStyled = styled.div`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: ${({ active }) => (active ? `2px solid ${greyBorder}` : "none")};
  cursor: pointer;
`;
