import React, { useState } from "react";
import TextInput from "../../../inputs";
import Tabar from "../../../tabbar";
import Button from "../../../buttons";
import { EventCreatorContainerStyled } from "./styled";

export default function EventCreator({
  value,
  placeholder,
  onClose,
  onSubmit,
}) {
  const intialDS = {
    title: "",
    type: { display: "Event", value: "event" },
  };

  const [eventData, setEventData] = useState(intialDS||value);

  const handleOnChange = (id, value) => {
    setEventData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <EventCreatorContainerStyled>
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
    </EventCreatorContainerStyled>
  );
}
