import React from "react";

import { v4 as uuidv4 } from "uuid";

import { greyBorder, greyDisabled, redOrange, white } from "../../../../colors";
import {
  CalendarDayContainerStyled,
  MetaBlockStyled,
  DayStyled,
  TimeBlockContainerStyled,
} from "./styled";
import EventBlock from "../eventBlock";

const formatTime = (timeString) => {
  // time format, 01:00

  if (typeof timeString !== "string") {
    return { hrs: timeString, mins: 0 };
  }

  const split = timeString.split(":");

  return { hrs: parseInt(split[0]), mins: parseFloat(split[1]) };
};

export const getTimeDisplay = (time) => {
  if (time < 12) {
    if (time === 0) return "12 AM";
    return `${time} AM`;
  } else {
    if (time === 12) return `12 PM`;
    return `${time % 12} PM`;
  }
};

export const getTimeDisplayNew = (time) => {
  const { hrs, mins } = formatTime(time);

  if (hrs < 12) {
    if (hrs === 0) return `12:${mins === 0 ? "00" : mins} AM`;
    return `${hrs}:${mins === 0 ? "00" : mins} AM`;
  } else {
    if (hrs === 12) return `12:${mins === 0 ? "00" : mins} PM`;
    return `${hrs % 12}:${mins === 0 ? "00" : mins} PM`;
  }
};

export const getTimeValue = (time) => {};

const time = new Array(24)
  .fill(1)
  .map((d, i) => ({ display: getTimeDisplay(i), value: i }));


  const getOffset  = (Y) => 
   {


   if(Y<10) return '00';
   if(Y>=10 && Y<20) return '15'
   if(Y>=20 && Y<30) return '30'
   if(Y>=30) return '45'
   }

const TimeBlock = ({
  borderTop,
  time,
  showTime,
  today,
  active,
  onClick,
  id,
}) => {
  // const handleOnClick = (e) => {

  //   console.log({ X: e.nativeEvent.offsetX, Y: e.nativeEvent.offsetY});
  // };

  const handleOnClick = (e) => {

    const Y = e.nativeEvent.offsetY

    const offset = getOffset(Y)


    console.log({ThisY:Y})





    const event = {
      title: "",
      color: "blue",
      id: uuidv4(),
      timeRange: [`${time.value}:${offset}`, `${time.value + 1}:${offset}`],
      date: id,
    };

    onClick(e, event);
  };

  return (
    <TimeBlockContainerStyled
      id={id}
      onClick={handleOnClick}
      // onClick={handleOnClick}
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

const getPostion = (timeRange) => {
  const start = formatTime(timeRange[0]);
  const end = formatTime(timeRange[1]);

  // calculate top

  const top = start.hrs * 4 + (start.mins / 60) * 4;

  // calculate height

  const height = (end.hrs - start.hrs) * 4 + ((end.mins - start.mins) / 60) * 4;

  return { top, height };
};

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
              onClick={onClick}
              id={d.id}
              date={d.date}
              type={d.type}
            />
          ))}

          {tempState ? (
            <EventBlock
              style={{ ...getPostion(tempState.timeRange) }}
              title={tempState.title}
              timeRange={tempState.timeRange}
              color={tempState.color}
              id={tempState.id}
              onClick={onClick}
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
