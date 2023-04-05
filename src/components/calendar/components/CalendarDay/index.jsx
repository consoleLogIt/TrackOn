import React from "react";
import {  greyDisabled } from "../../../../colors";
import { CalendarDayContainerStyled, MetaBlockStyled, DayStyled } from "./styled";

export default function CalendarDay({ day, week, disabled,today }) {
  return (
    <CalendarDayContainerStyled>
      <MetaBlockStyled disabled={disabled}>
        <DayStyled disabled = {disabled} today = {today}>{day}</DayStyled>{" "}
        <span style={{ color: greyDisabled }}>{week}</span>{" "}
      </MetaBlockStyled>
    </CalendarDayContainerStyled>
  );
}
