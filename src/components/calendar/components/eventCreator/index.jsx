import React, { useEffect, useRef, useState } from "react";
import TextInput from "../../../inputs";
import Tabar from "../../../tabbar";
import Button from "../../../buttons";
import {
  ChooseColorContainerStyled,
  ColorItemStyled,
  EventCreatorContainerStyled,
} from "./styled";
import { animated, useSpring } from "@react-spring/web";
import { eventColors } from "../../../../colors";

const AnimatedEventCreator = animated(EventCreatorContainerStyled);

const ChooseColor = ({ value, handleOnChange, id }) => {
  return (
    <ChooseColorContainerStyled>
      {Object.keys(eventColors).map((d) => (
        <ColorItemStyled
          onClick={() => handleOnChange(id, d)}
          active={d === value}
          color={eventColors[d]}
        />
      ))}
    </ChooseColorContainerStyled>
  );
};

export default function EventCreator({
  value,
  placeholder = "No Title",
  onClose,
  onSubmit,
  style,
  id,
  event,
  setEventCreator,
}) {
  const [springObj, setSpringObj] = useState({
    from: { x: 170 },
    to: { x: 200 },
  });

  // const intialDS = {
  //   id,
  //   title: "",
  //   type: { display: "Event", value: "event" },
  //   color: "blue",
  // };

  const ref = useRef();

  useEffect(() => {
    const screenWidth = screen.width;
    const right = ref.current.getBoundingClientRect().right;

    if (right > screenWidth) {
      setSpringObj({
        from: { x: -80 },
        to: { x: -100 },
      });
    }
  }, []);

  const spring = useSpring(springObj);

  const eventData = event;

  const handleOnChange = (id, value) => {
    eventData[id] = value;

    setEventCreator((prev) => ({ ...prev, event: eventData }));
  };

  return (
    <AnimatedEventCreator ref={ref} style={{ ...spring, ...style }}>
      <TextInput
        placeholder={placeholder}
        value={eventData["title"]}
        onChange={(value) => handleOnChange("title", value)}
      />

      <Tabar
        S
        value={eventData["type"]}
        onChange={(value) => handleOnChange("type", value)}
        options={[
          { display: "Event", value: "event" },
          { display: "Reminder", value: "reminder" },
          { display: "Task", value: "task" },
          { display: "Notes", value: "notes" },
        ]}
      />
      <ChooseColor
        value={eventData["color"]}
        id="color"
        handleOnChange={handleOnChange}
      />

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={() => onSubmit(eventData)}>Submit</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </AnimatedEventCreator>
  );
}
