import React, { useEffect, useRef, useState } from "react";
import TextInput from "../../../inputs";
import Tabar from "../../../tabbar";
import Button from "../../../buttons";
import {
  ButtonsWrapperStyled,
  ChooseColorContainerStyled,
  ColorItemStyled,
  EventCreatorContainerStyled,
  SelectStyled,
  TimeSelectorWrapperStyled,
} from "./styled";
import { animated, useSpring } from "@react-spring/web";
import { eventColors, greyDarker } from "../../../../colors";
import Dropdown from "../../../dropdown";
import { getTimeDisplay, getTimeDisplayNew } from "../CalendarDay";

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

// const time = new Array(24)
//   .fill(1)
//   .map((d, i) => ({ display: getTimeDisplay(i), value: i }));

const timeNew = new Array(24)
  .fill(1)
  .map((d, outI) => {
    return new Array(4).fill(1).map((dd, inI) => {
      const min = inI === 0 ? "00" : 15 * inI;

      const value = `${outI}:${min}`;

      return { display: getTimeDisplayNew(value), value };
    });
  })
  .reduce((a, c) => [...a, ...c], []);

// console.log({timeNew})

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
  const eventData = event;

  const handleFirstTimeRangeValueChange = (value) => {
    const firstTimeRangeValueIndex = timeNew.findIndex(
      (d) => d.value === value.value
    );

    // set the second time range value as next 1hr which currIndex + 4
    const secondTimeRangeValueIndex =
      firstTimeRangeValueIndex + 4 > timeNew.length - 1
        ? timeNew.length - 1
        : firstTimeRangeValueIndex + 4;

    console.log({ secondTimeRangeValueIndex, timeNew });

    const newValue = [
      `${value.value}`,
      timeNew[secondTimeRangeValueIndex].value,
    ];

    handleOnChange("timeRange", newValue);
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

      <TimeSelectorWrapperStyled>
        <Dropdown
          options={timeNew}
          onChange={handleFirstTimeRangeValueChange}
          value={eventData["timeRange"][0]}
        />
        <span
          style={{ border: `2px solid ${greyDarker}`, width: "1rem" }}
        ></span>
        <Dropdown
          options={timeNew.slice(
            timeNew.findIndex((d) => d.value === eventData["timeRange"][0]),
            timeNew.length
          )}
          onChange={(value) => {
            const newValue = [eventData["timeRange"][0], `${value.value}`];

            handleOnChange("timeRange", newValue);
          }}
          value={eventData["timeRange"][1]}
        />
      </TimeSelectorWrapperStyled>

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

      <ButtonsWrapperStyled>
        <Button onClick={() => onSubmit(eventData)}>Submit</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ButtonsWrapperStyled>
    </AnimatedEventCreator>
  );
}
