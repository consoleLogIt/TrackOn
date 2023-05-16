import React from "react";
import {
  EventContainerStyled,
  EventTimeStyled,
  EventTitleStyled,
} from "./styled";
import { getTimeDisplayNew } from "../CalendarDay";

export default function EventBlock({ title, timeRange, style, color }) {
  return (
    <EventContainerStyled {...style} color={color}>
      <EventTitleStyled>{title}</EventTitleStyled>
      <EventTimeStyled>
        {`${getTimeDisplayNew(timeRange[0])} -- ${getTimeDisplayNew(timeRange[1])}`}
      </EventTimeStyled>
    </EventContainerStyled>
  );
}



