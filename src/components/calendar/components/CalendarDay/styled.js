import styled from "styled-components";
import {
  black,
  greyBorder,
  greyDark,
  greyDisabled,
  white,
} from "../../../../colors";

export const CalendarDayContainerStyled = styled.div`
  border: 1.5px solid ${greyBorder};
  min-height: 11.5rem;
`;

export const MetaBlockStyled = styled.div`
  font-size: 1.5rem;
  padding: .7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
