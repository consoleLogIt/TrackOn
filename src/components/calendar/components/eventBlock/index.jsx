import React, { useEffect, useRef } from "react";
import {
  EventContainerStyled,
  EventTimeStyled,
  EventTitleStyled,
} from "./styled";
import { getTimeDisplayNew } from "../CalendarDay";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function EventBlock({
  title,
  timeRange,
  style,
  color,
  onClick,
  id,
  date,
  type,
}) {
  const eventRef = useRef();
  const event = { title, id, color, timeRange, date, type };
  const [{ dragging }, drag, preview] = useDrag({
    type: "event",
    item: { event, eventRef },
    collect: (monitor) => ({ dragging: monitor.isDragging() }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

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
    <EventContainerStyled
      dragging={dragging}
      ref={drag(eventRef)}
      {...style}
      color={color}
      onClick={handleOnClick}
    >
      <EventTitleStyled>{title}</EventTitleStyled>
      <EventTimeStyled>
        {`${getTimeDisplayNew(timeRange[0])} -- ${getTimeDisplayNew(
          timeRange[1]
        )}`}
      </EventTimeStyled>
    </EventContainerStyled>
  );
}
