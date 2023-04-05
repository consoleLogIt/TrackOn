// if (isRightClick) {
    //   if (currentIndex + windowSize >= monthDays.length) {
    //     // next month
    //     const nextMonthDays = calendarInstance.getCalendar(
    //       currentYear,
    //       currentMonthNumber + 1
    //     );

    //     let newIndex;
    //     // if (lastDayOfTheMonth === monthDays[monthDays.length - 1].day) {
    //     if (lastDayOfMonth.day >= 28) {
    //       newIndex = nextMonthDays.findIndex((d) => d.day === 1);
    //     } else {
    //       newIndex =
    //         nextMonthDays.findIndex((d) =>
    //           isEqualDate(d, monthDays[monthDays.length - 1])
    //         ) + 1;
    //     }

    //     setCurrentIndex(newIndex);

    //     setMonthDays(nextMonthDays);
    //   } else {
    //     setCurrentIndex((prev) => prev + windowSize);
    //   }
    // } else {
    //   if () {
    //     // next month
    //     const prevMonthDays = calendarInstance.getCalendar(
    //       currentYear,
    //       currentMonthNumber - 1
    //     );

    //     const lastDateOfPreviousMonth = new Date(
    //       currentYear,
    //       currentMonthNumber,
    //       0
    //     );

    //     let prevIndex;
    //     if (firstDayOfMonth === 1) {
    //       prevIndex = prevMonthDays.findIndex((d) =>
    //         isEqualDate(d, {
    //           day: lastDateOfPreviousMonth.getDate(),
    //           month: lastDateOfPreviousMonth.getMonth(),
    //           year: lastDateOfPreviousMonth.getFullYear(),
    //         })
    //       );
    //     } else {
    //       prevIndex =
    //         prevMonthDays.findIndex((d) => isEqualDate(d, firstDayOfMonth)) - 1;
    //     }

    //     setCurrentIndex(prevIndex);

    //     setMonthDays(prevMonthDays);
    //   } else {
    //     setCurrentIndex((prev) => prev - windowSize);
    //   }
    // }