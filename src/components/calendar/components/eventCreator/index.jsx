import React, { useEffect, useRef, useState } from "react";
import TextInput from "../../../inputs";
import Tabar from "../../../tabbar";
import Button from "../../../buttons";
import { EventCreatorContainerStyled } from "./styled";
import { animated, useSpring } from "@react-spring/web";

const AnimatedEventCreator = animated(EventCreatorContainerStyled);

export default function EventCreator({
  value,
  placeholder,
  onClose,
  onSubmit,
}) {
  const [springObj, setSpringObj] = useState({
    from: { x: 80 },
    to: { x: 100 },
  });

  const intialDS = {
    title: "",
    type: { display: "Event", value: "event" },
  };

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

  const [eventData, setEventData] = useState(intialDS || value);

  const handleOnChange = (id, value) => {
    setEventData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <AnimatedEventCreator ref={ref} style={spring}>
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

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={() => onSubmit(eventData)}>Submit</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </AnimatedEventCreator>
  );
}
