import styled from "styled-components";

export const CheckboxContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CheckBoxButtonStyled = styled.button`
  /* background-color: #0085fe; */

  color: white;

  background-color: ${({ selected }) => (selected ? "#0085fe" : "")};
  border: ${({ selected }) => (selected ? "none" : "")};

  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  svg {
    padding: 0;
  }
`;

export const CheckBoxTextStyled = styled.span`
  font-size: 1.4rem;
`;
