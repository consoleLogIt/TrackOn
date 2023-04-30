import styled from "styled-components";
import {
  black,
  greyBorder,
  greyDark,
  greyDisabled,
  greyLight,
  white,
} from "../../../../colors";

export const CalendarDayContainerStyled = styled.div`
  border: 1.5px solid ${greyBorder};
  min-height: 11.5rem;
  cursor: pointer;
  height: 100%;
  /* background-color: ${({ active }) => (active ? "lightblue" : white)}; */
`;

export const TimeBlockContainerStyled = styled.div`
  border-bottom: 1px solid ${greyBorder};
  border-top: ${({ borderTop }) =>
    borderTop ? `1px solid ${greyBorder}` : null};
  height: 4rem;
  position: relative;
  /* padding: 0.5rem; */
  background-color: ${({ active }) => (active ? "lightblue" : white)};

`;

export const MetaBlockStyled = styled.div`
  font-size: 1.5rem;
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-height: 2rem; */
`;

export const DayStyled = styled.h4`
  margin: 0;
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ today, disabled }) =>
    disabled ? white : today ? black : white};
  color: ${({ today, disabled }) =>
    disabled ? greyDark : today ? white : black};
  border-radius: 50%;
`;
