import React from "react";
import { greyBorder, greyDisabled, redOrange } from "../../../../colors";
import {
  CalendarDayContainerStyled,
  MetaBlockStyled,
  DayStyled,
  TimeBlockContainerStyled,
} from "./styled";
import EventCreator from "../eventCreator";

const getTimeDisplay = (time) => {
  if (time < 12) {
    if (time === 0) return "";
    return `${time} AM`;
  } else {
    if (time === 12) return `${12} PM`;
    return `${time % 12} PM`;
  }
};

const time = new Array(24)
  .fill(1)
  .map((d, i) => ({ display: getTimeDisplay(i), value: i }));

const TimeBlock = ({ borderTop, time, showTime, today }) => {
  return (
    <TimeBlockContainerStyled borderTop={borderTop}>
      {showTime ? (
        <span style={{ fontSize: "1.1rem", marginTop: "-1rem" }}>
          {time.display}
        </span>
      ) : null}
      {today && time.value === new Date().getHours() ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: `${(new Date().getMinutes() * 5) / 3}%`, // 5/3 === 1min

            textAlign: "right",
          }}
        >
          <div
            style={{
              height: "1px",
              backgroundColor: redOrange,
            }}
          ></div>
          <div
            style={{
              borderRadius: "50%",
              height: "1rem",
              width: "1rem",
              marginTop: "-5px",
              backgroundColor: redOrange,
              position: "relative",

              float: "right",
              zIndex: "2",
            }}
          ></div>
        </div>
      ) : null}
    </TimeBlockContainerStyled>
  );
};

export default function CalendarDay({
  day,
  active,
  onClick,
  week,
  disabled,
  today,
  value,
  onCloseCreator,
  showTimeDivision,
  showTime,
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

        {showTimeDivision
          ? time.map((d, i) => (
              <TimeBlock
                showTime={showTime}
                today={today}
                time={d}
                borderTop={i === 0}
              />
            ))
          : null}
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
