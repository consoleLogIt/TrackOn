import React from "react";
import { SidebarContainerStyled, SidebarHeaderStyled } from "./styled";
import { useGetAppContext } from "../../context";

export default function Sidebar() {
  return (
    <SidebarContainerStyled>
      <SidebarHeaderStyled>Filters</SidebarHeaderStyled>
    </SidebarContainerStyled>
  );
}
