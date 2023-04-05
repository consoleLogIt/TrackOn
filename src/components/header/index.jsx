import React from "react";
import { redOrange, white } from "../../colors";
import Button from "../buttons";
import Tabar from "../tabbar";
import {
  HeaderContainerStyled,
  HeaderDaysButtonsStyled,
  HeaderTitleStyled,
} from "./styled";

export default function Header({ layout, setLayout }) {
  return (
    <HeaderContainerStyled>
      <HeaderTitleStyled>Calendar</HeaderTitleStyled>
      <HeaderDaysButtonsStyled>
        <Tabar
          options={[
            { display: "Day", value: "day" },
            { display: "Week", value: "week" },
            { display: "Month", value: "month" },
          ]}
          value={layout}
          onChange={setLayout}
        ></Tabar>
      </HeaderDaysButtonsStyled>
      <Button icon={"Plus"} textColor={white} bgColor={redOrange}>
        Add Event
      </Button>
    </HeaderContainerStyled>
  );
}
