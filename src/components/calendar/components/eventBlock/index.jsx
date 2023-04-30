import React from "react";
import {
  EventContainerStyled,
  EventTimeStyled,
  EventTitleStyled,
} from "./styled";

export default function EventBlock({ title, timeRange, style, color }) {
  return (
    <EventContainerStyled {...style} color={color}>
      <EventTitleStyled>{title}</EventTitleStyled>
      <EventTimeStyled>
        {`${timeRange[0]} -- ${timeRange[1]}`}
      </EventTimeStyled>
    </EventContainerStyled>
  );
}



