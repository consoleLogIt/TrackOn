import React, { useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import { greyBorder, greyDisabled, redOrange, white } from "../../../../colors";
import {
  CalendarDayContainerStyled,
  MetaBlockStyled,
  DayStyled,
  TimeBlockContainerStyled,
} from "./styled";
import EventBlock from "../eventBlock";
import { useDrop } from "react-dnd";
import { CustomDragLayer, snapToGrid } from "../CustomDrag";

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

const getOffset = (Y) => {
  if (Y < 10) return "00";
  if (Y >= 10 && Y < 20) return "15";
  if (Y >= 20 && Y < 30) return "30";
  if (Y >= 30) return "45";
};

const TimeBlock = ({ borderTop, time, showTime, today, onClick, date }) => {
  const handleOnClick = (e) => {
    const Y = e.nativeEvent.offsetY;

    const offset = getOffset(Y);

    const event = {
      title: "",
      color: "blue",
      id: uuidv4(),
      timeRange: [`${time.value}:${offset}`, `${time.value + 1}:${offset}`],
      date,
    };

    onClick(e, event);
  };

  return (
    <TimeBlockContainerStyled
      id={date}
      onClick={handleOnClick}
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

export const getPostion = (timeRange) => {
  const start = formatTime(timeRange[0]);
  const end = formatTime(timeRange[1]);

  console.log({ start, end });

  // calculate top

  const top = start.hrs * 4 + (start.mins / 60) * 4; // divide by 60 to convert into hrs

  // calculate height

  const height = (end.hrs - start.hrs) * 4 + ((end.mins - start.mins) / 60) * 4;

  return { top, height };
};

export default function CalendarDay({
  day,
  week,
  disabled,
  today,
  showTimeDivision,
  showTime,
  id,
  events,
  tempState,
  setEventCreator,
  getParentBoundingRect,
  handleUpdateOneEvent,
}) {
  const timeBlockContainerRef = useRef();

  const getBoundingRect = () => {
    return timeBlockContainerRef.current.getBoundingClientRect();
  };

  const handleOnClickNew = (e, event) => {
    const parentContainer = timeBlockContainerRef.current;
    const elem = e.target;

    const timeBlockContainerRect = parentContainer.getBoundingClientRect();
    const parentRect = getParentBoundingRect();

    const targetRect = elem.getBoundingClientRect();

    setEventCreator({
      show: true,
      style: {
        top: targetRect.top - timeBlockContainerRect.top,
        left: timeBlockContainerRect.left - parentRect.left,
      },
      event,
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: "event",
    drop: (item, monitor) => {
      const { x, y } = monitor.getSourceClientOffset();
      const parentY = getBoundingRect().top;

      const { snappedX, snappedY } = snapToGrid(x, y);

      const targetY = Math.floor((snappedY - parentY) / 10);

      const hrs = Math.floor(targetY / 4);
      const mins = ((targetY % 4) / 4) * 60;

      const time1 = formatTime(item.event.timeRange[0]);
      const time2 = formatTime(item.event.timeRange[1]);

      const newTime1 = { hrs: hrs, mins: mins };
      const newTime2 = { hrs: time2.hrs -time1.hrs + hrs, mins: time2.mins - time2.mins + mins };

      const newTimeRange = [
        `${newTime1.hrs}:${newTime1.mins}`,
        `${newTime2.hrs}:${newTime2.mins}`,
      ];

      item.event.timeRange = newTimeRange;

      console.log({ newTimeRange, hrs, mins, targetY, newTime2 });

      handleUpdateOneEvent(item.event);
    },

    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <CalendarDayContainerStyled active={isOver}>
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
          {" "}
          <div ref={drop(timeBlockContainerRef)}>
            {events.map((d) => (
              <EventBlock
                style={{ ...getPostion(d.timeRange) }}
                title={d.title}
                timeRange={d.timeRange}
                color={d.color}
                onClick={handleOnClickNew}
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
                onClick={handleOnClickNew}
              />
            ) : null}

            {time.map((d, i) => (
              <TimeBlock
                date={`${id}`}
                showTime={showTime}
                today={today}
                time={d}
                borderTop={i === 0}
                onClick={handleOnClickNew}
              />
            ))}
          </div>
          <CustomDragLayer getParentBoundingRect={getBoundingRect} date={id} />
        </div>
      ) : null}
    </CalendarDayContainerStyled>
  );
}
