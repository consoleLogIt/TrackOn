import React, { useState } from "react";
import {
  SidebarContainerStyled,
  SidebarHeaderStyled,
  SidebarBodyStyled,
} from "./styled";
import { useGetAppContext } from "../../context";
import Checkbox from "../checkbox";
import { EVENT_COLORS, EVENT_TYPES } from "../../constants";

export default function Sidebar({onChange, filters}) {
  

  return (
    <SidebarContainerStyled>
      <SidebarHeaderStyled fontSize={"2rem"}>Filters</SidebarHeaderStyled>
      <SidebarBodyStyled>
        <SidebarHeaderStyled>Event Type</SidebarHeaderStyled>

        {EVENT_TYPES.map((d) => (
          <Checkbox
            value={filters[d.value]}
            display={d.display}
            id={d.value}
            onChange={onChange}
          />
        ))}

        <SidebarHeaderStyled>Event Color</SidebarHeaderStyled>

        {EVENT_COLORS.map((d) => (
          <Checkbox
            value={filters[d.value]}
            display={d.display}
            id={d.value}
            onChange={onChange}
          />
        ))}
      </SidebarBodyStyled>
    </SidebarContainerStyled>
  );
}
