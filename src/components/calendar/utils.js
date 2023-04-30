import { monthsShort } from "./constants";

export const getMonthAndYear = ({ fromIndex, toIndex, monthDays, layout }) => {
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

export const isEqualDate = (date1, date2) => {
  console.log({date1,date2})
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

export const getText = ({ month, monthExtra, year, yearExtra }) => {
  if ((monthExtra || monthExtra === 0) && yearExtra) {
    return `${monthsShort [month]} ${year} - ${monthsShort[monthExtra]} ${yearExtra}`;
  } else if (yearExtra) {
    return `${monthsShort[month]} ${year} - ${yearExtra}`;
  } else if (monthExtra) {
    return `${monthsShort[month]} - ${monthsShort[monthExtra]} ${year}`;
  } else {
    return `${monthsShort[month]} ${year}`;
  }
};
