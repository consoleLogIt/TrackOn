import React, { useState, useRef } from "react";
import Button from "../buttons";
import CalendarDay from "./components/CalendarDay";

import {
  CalendarContainerStyled,
  CalendarDaysWrapperStyled,
  CalendarHeaderStyled,
} from "./styled";
import { Calendar as CalenderConstructor } from "calendar-base";
import { animated, useSpring } from "@react-spring/web";
import EventCreator from "./components/eventCreator";
import { weeks } from "./constants";
import { getText, getMonthAndYear, isEqualDate } from "./utils";
import { CustomDragLayer } from "./components/CustomDrag";

export default function Calendar({ layout, localState, setLocalState }) {
  const calendarInstance = new CalenderConstructor({ siblingMonths: true });
  const today = new Date();

  const calendarContainerRef = useRef();

  const [monthDays, setMonthDays] = useState(
    calendarInstance.getCalendar(today.getFullYear(), today.getMonth())
  );
  const [currentIndex, setCurrentIndex] = useState(
    monthDays.findIndex((d) =>
      isEqualDate(d, {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
      })
    )
  );

  const [eventCreator, setEventCreator] = useState({
    show: false,
    event: {},
    style: {},
  });

  const [springs, api] = useSpring(() => ({ from: { x: 0 } }));

  const AnimatedCalendar = animated(CalendarDaysWrapperStyled);

  const handleDaysChange = ({ isRightClick }) => {
    let windowSize =
      layout.value === "day"
        ? 1
        : layout.value === "week"
        ? 7
        : monthDays.length;

    // means left click
    if (!isRightClick) {
      windowSize *= -1;
    }

    const currentMonthNumber = monthDays[parseInt(monthDays.length / 2)].month;
    const currentYear = monthDays[parseInt(monthDays.length / 2)].year;
    const lastDayOfMonth = monthDays[monthDays.length - 1];
    const firstDayOfMonth = monthDays[0];

    if (currentIndex + windowSize >= monthDays.length) {
      // next month
      const nextMonthDays = calendarInstance.getCalendar(
        currentYear,
        currentMonthNumber + 1
      );

      let newIndex;
      // if (lastDayOfTheMonth === monthDays[monthDays.length - 1].day) {
      if (lastDayOfMonth.day >= 28) {
        newIndex = nextMonthDays.findIndex((d) => d.day === 1);
      } else {
        newIndex =
          nextMonthDays.findIndex((d) =>
            isEqualDate(d, monthDays[monthDays.length - 1])
          ) + 1;
      }

      setCurrentIndex(newIndex);

      setMonthDays(nextMonthDays);
    } else if (currentIndex + windowSize < 0) {
      const prevMonthDays = calendarInstance.getCalendar(
        currentYear,
        currentMonthNumber - 1
      );

      const lastDateOfPreviousMonth = new Date(
        currentYear,
        currentMonthNumber,
        0
      );

      let prevIndex;
      if (firstDayOfMonth === 1) {
        prevIndex = prevMonthDays.findIndex((d) =>
          isEqualDate(d, {
            day: lastDateOfPreviousMonth.getDate(),
            month: lastDateOfPreviousMonth.getMonth(),
            year: lastDateOfPreviousMonth.getFullYear(),
          })
        );
      } else {
        prevIndex =
          prevMonthDays.findIndex((d) => isEqualDate(d, firstDayOfMonth)) - 1;
      }

      setCurrentIndex(prevIndex);

      setMonthDays(prevMonthDays);
    } else {
      setCurrentIndex((prev) => prev + windowSize);
    }
  };

  const getParentBoundingRect = () => {
    return calendarContainerRef.current.getBoundingClientRect();
  };

  const handleOnSubmit = (data) => {
    setLocalState((prev) => {
      if (data.temp) {
        delete data.temp;
        return prev.concat(data);
      }

      const index = prev.findIndex((d) => d.id === data.id);

      prev[index] = data;

      return [...prev];
    });

    setEventCreator({});
  };

  const handleUpdateOneEvent = (event) => {
    console.log({ event });

    setLocalState((prev) => [...prev.filter((d) => d.id !== event.id), event]);
  };

  const handleDeleteEvent = (eventId) => {
    setLocalState((prev) => prev.filter((event) => event.id !== eventId));
  };

  const fromIndex =
    layout.value === "day"
      ? currentIndex
      : layout.value === "week"
      ? currentIndex - monthDays[currentIndex].weekDay
      : 0;
  const toIndex =
    layout.value === "day"
      ? fromIndex + 1
      : layout.value === "week"
      ? fromIndex + 7
      : undefined;

  console.log({ eventCreator });

  return (
    <CalendarContainerStyled>
      <CalendarHeaderStyled>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Button onClick={handleDaysChange} icon="ArrowLeft" />

          <Button
            onClick={() => handleDaysChange({ isRightClick: true })}
            icon="ArrowRight"
          />
        </div>
        <animated.h2
          style={{ fontSize: "2rem", flex: "1", alignSelf: "center" }}
        >
          {getText({
            ...getMonthAndYear({
              fromIndex,
              toIndex: toIndex ? toIndex - 1 : toIndex,
              monthDays,
              layout,
            }),
          })}
        </animated.h2>
      </CalendarHeaderStyled>

      <CalendarDaysWrapperStyled
        ref={calendarContainerRef}
        day={layout.value === "day"}
        // style={springs}
      >
        {monthDays.slice(fromIndex, toIndex).map((d, i) => {
          const uniqueId = `${d.day}_${d.month}_${d.year}`;

          return (
            <CalendarDay
              getParentBoundingRect={getParentBoundingRect}
              week={weeks[d.weekDay]}
              handleUpdateOneEvent={handleUpdateOneEvent}
              showTimeDivision={
                layout.value === "week" || layout.value === "day"
              }
              showTime={i === 0} // show time for first only
              day={d.day}
              currentHour={today.getHours()}
              id={uniqueId}
              today={isEqualDate(d, {
                day: today.getDate(),
                month: today.getMonth(),
                year: today.getFullYear(),
              })}
              onCloseCreator={() => setEventCreator(false)}
              setEventCreator={setEventCreator}
              events={localState.filter((d) => d.date === uniqueId)}
              tempState={
                eventCreator?.event?.date === uniqueId
                  ? eventCreator.event
                  : undefined
              }
            />
          );
        })}

        {/* <CustomDragLayer /> */}

        {eventCreator.show ? (
          <EventCreator
            key={eventCreator.event?.id}
            id={eventCreator.event?.id}
            style={eventCreator.style}
            event={eventCreator.event}
            placeholder={"Enter here"}
            setEventCreator={setEventCreator}
            onClose={() => setEventCreator({})}
            onSubmit={handleOnSubmit}
            handleDeleteEvent={handleDeleteEvent}
          />
        ) : null}
        {/* <div style={{padding:"10rem"}}></div> */}
      </CalendarDaysWrapperStyled>
    </CalendarContainerStyled>
  );
}
