import React, { useEffect, useState } from "react";
import Button from "../buttons";
import CalendarDay from "./components/CalendarDay";
import {
  CalendarContainerStyled,
  CalendarDaysWrapperStyled,
  CalendarHeaderStyled,
} from "./styled";
import { Calendar as CalenderConstructor } from "calendar-base";
import { animated, useSpring } from "@react-spring/web";
import { greyBorder } from "../../colors";

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weeks = ["Su", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"];

// const handleArrowClick = ({isRight}) => {

//   const min = 0;
//   const max = monthDays.length

//   if(isRight){

//     let uptoIndex = currentIndex

//     if(layout.value==="week"){
//       uptoIndex+=7;
//     }
//     else{

//     }

//     api.start({ from: { x: 100 }, to: { x: 0 } });
//     setCurrentIndex(
//       prev => prev+1
//     );

//   }
//   else{
//     // api.start({ from: { x: -100 }, to: { x: 0 } });
//     // setCurrentDate(
//     //   (prev) => new Date(prev.getFullYear(), prev.getMonth(), prev.getDay())
//     // );

//   }
// }

const getMonthAndYear = ({ fromIndex, toIndex, monthDays, layout }) => {
  if (toIndex === undefined) {
    const { month, year } = monthDays[parseInt(monthDays.length / 2)];
    return { month, year };
  } else if (layout.value === "day") {
    const { month: fromMonth, year: fromYear } = monthDays[fromIndex];
    return { month: fromMonth, year: fromYear };
  } else {
    const { month: fromMonth, year: fromYear } = monthDays[fromIndex];
    const { month: toMonth, year: toYear } = monthDays[toIndex];

    const returnValue = {};
    returnValue.month = fromMonth;
    returnValue.year = fromYear;

    if (fromMonth !== toMonth) {
      returnValue.monthExtra = toMonth;
    }

    if (fromYear !== toYear) {
      returnValue.yearExtra = toYear;
    }

    return returnValue;
  }
};

const isEqualDate = (date1, date2) => {
  return (
    date1.day === date2.day &&
    date1.month === date2.month &&
    date1.year === date2.year
  );
};

// case 1:  month year
// case 2 : month-monthExtra year
// case 3: month year - monthExtra yearExtra
// case 4: month year - yearExtra

const getText = ({ month, monthExtra, year, yearExtra }) => {
  if ((monthExtra || monthExtra === 0) && yearExtra) {
    return `${monthsShort[month]} ${year} - ${monthsShort[monthExtra]} ${yearExtra}`;
  } else if (yearExtra) {
    return `${monthsShort[month]} ${year} - ${yearExtra}`;
  } else if (monthExtra) {
    return `${monthsShort[month]} - ${monthsShort[monthExtra]} ${year}`;
  } else {
    return `${monthsShort[month]} ${year}`;
  }
};

export default function Calendar({ layout }) {
  const calendarInstance = new CalenderConstructor({ siblingMonths: true });
  const today = new Date();

  const [monthDays, setMonthDays] = useState(
    calendarInstance.getCalendar(today.getFullYear(), today.getMonth())
  );
  const [currentIndex, setCurrentIndex] = useState(
    monthDays.findIndex((d) => d.day === today.getDate())
  );

  const [showEventCreaterOnDay, setShowEventCreaterOnDay] = useState(false);

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

  //

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

      <AnimatedCalendar day={layout.value === "day"} style={springs}>
        {monthDays.slice(fromIndex, toIndex).map((d, i) => (
          <CalendarDay
            week={weeks[d.weekDay]}
            showTimeDivision={layout.value === "week" || layout.value === "day"}
            showTime={i === 0}
            day={d.day}
            currentHour={today.getHours()}
            today={isEqualDate(d, {
              day: today.getDate(),
              month: today.getMonth(),
              year: today.getFullYear(),
            })}
            onClick={() => setShowEventCreaterOnDay(d)}
            onCloseCreator={() => setShowEventCreaterOnDay(false)}
            active={
              showEventCreaterOnDay
                ? isEqualDate(showEventCreaterOnDay, d)
                : false
            }
          />
        ))}
      </AnimatedCalendar>
    </CalendarContainerStyled>
  );
}
