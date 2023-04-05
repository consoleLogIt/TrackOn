import React from "react";
import { TabbarContainerStyled, TabbarItem } from "./styled";
import { useState } from "react";

export default function Tabar({ options = [], value, onChange }) {
  const [active, setActive] = useState(value || options[0]);

  console.log({active})

  const handleOnChange = (value) => {
    setActive(value);

    onChange(value);
  };

  return (
    <TabbarContainerStyled>
      {options.map((d) => (
        <TabbarItem
          onClick={() => handleOnChange(d)}
          active={active.value === d.value}
        >
          {d.display}
        </TabbarItem>
      ))}
    </TabbarContainerStyled>
  );
}
