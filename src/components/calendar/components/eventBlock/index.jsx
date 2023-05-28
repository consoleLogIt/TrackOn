import React from "react";
import {
  EventContainerStyled,
  EventTimeStyled,
  EventTitleStyled,
} from "./styled";
import { getTimeDisplayNew } from "../CalendarDay";

export default function EventBlock({
  title,
  timeRange,
  style,
  color,
  onClick,
  id,
  date,
  type
}) {
  const handleOnClick = (e) => {
    const event = {
      title,
      color,
      id,
      type,
      timeRange: timeRange,
      date,
    };

    onClick(e, event);
  };

  return (
    <EventContainerStyled {...style} color={color} onClick={handleOnClick}>
      <EventTitleStyled>{title}</EventTitleStyled>
      <EventTimeStyled>
        {`${getTimeDisplayNew(timeRange[0])} -- ${getTimeDisplayNew(
          timeRange[1]
        )}`}
      </EventTimeStyled>
    </EventContainerStyled>
  );
}
