import React from "react";
import { greyBorder, greyDisabled, redOrange, white } from "../../../../colors";
import {
  CalendarDayContainerStyled,
  MetaBlockStyled,
  DayStyled,
  TimeBlockContainerStyled,
} from "./styled";
import EventCreator from "../eventCreator";
import Event from "../eventBlock";
import EventBlock from "../eventBlock";

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

const TimeBlock = ({
  borderTop,
  time,
  showTime,
  today,
  active,
  onClick,
  id,
}) => {
  return (
    <TimeBlockContainerStyled
      id={id}
      onClick={(e) => onClick(e, id, time.value)}
      active={active}
      borderTop={borderTop}
    >
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

const formatTime = (timeString) => {
  // time format, 01:00

  const split = timeString.split(":");

  return { hrs: parseInt(split[0]), mins: parseInt(split[1]) };
};

const getPostion = (timeRange) => {
  const start = formatTime(timeRange[0]);
  const end = formatTime(timeRange[1]);

  // calculate top

  const top = start.hrs * 4 + (start.mins / 60) * 4;

  // calculate height

  const height = (end.hrs - start.hrs) * 4 + ((end.mins - start.mins) / 60) * 4;

  return { top, height };
};

// const events  = [{time:10},{time:12},{time:5},{time:18}]

export default function CalendarDay({
  day,
  active,
  onClick,
  week,
  disabled,
  today,
  showTimeDivision,
  showTime,
  id,
  events,
  tempState,
}) {
  return (
    // <div style={{ position: "relative" }}>
    <CalendarDayContainerStyled
      active={active === id}
      onClick={showTimeDivision ? null : (e) => onClick(e, id)}
    >
      <MetaBlockStyled disabled={disabled}>
        <DayStyled disabled={disabled} today={today}>
          {day}
        </DayStyled>{" "}
        <span style={{ color: greyDisabled }}>{week}</span>{" "}
      </MetaBlockStyled>

      {showTimeDivision ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {events.map((d) => (
            <EventBlock
              style={{ ...getPostion(d.timeRange) }}
              title={d.title}
              timeRange={d.timeRange}
              color={d.color}
            />
          ))}

          {tempState && tempState.id === id ? (
            <EventBlock
              style={{ ...getPostion(tempState.timeRange) }}
              title={tempState.title}
              timeRange={tempState.timeRange}
              color={tempState.color}
            />
          ) : null}

          {time.map((d, i) => (
            <TimeBlock
              id={`${id}`}
              showTime={showTime}
              today={today}
              time={d}
              borderTop={i === 0}
              onClick={onClick}
            />
          ))}
        </div>
      ) : null}
    </CalendarDayContainerStyled>
  );
}
