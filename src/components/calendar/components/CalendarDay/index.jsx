import React from "react";
import { greyDisabled } from "../../../../colors";
import {
  CalendarDayContainerStyled,
  MetaBlockStyled,
  DayStyled,
} from "./styled";
import EventCreator from "../eventCreator";

export default function CalendarDay({
  day,
  active,
  onClick,
  week,
  disabled,
  today,
  value,
  onCloseCreator,
}) {
  return (
    <div style={{ position: "relative" }}>
      <CalendarDayContainerStyled onClick={onClick} active={active}>
        <MetaBlockStyled disabled={disabled}>
          <DayStyled disabled={disabled} today={today}>
            {day}
          </DayStyled>{" "}
          <span style={{ color: greyDisabled }}>{week}</span>{" "}
        </MetaBlockStyled>
      </CalendarDayContainerStyled>
      {active ? (
        <EventCreator
          placeholder={"Enter here"}
          value={value}
          onClose={onCloseCreator}
          onSubmit={(data) => {
            onCloseCreator();
          }}
        />
      ) : null}
    </div>
  );
}
