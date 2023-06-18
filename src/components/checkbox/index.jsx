import React from "react";
import {
  CheckBoxButtonStyled,
  CheckboxContainerStyled,
  CheckBoxTextStyled,
} from "./styled";
import { Check } from "phosphor-react";

export default function Checkbox({ value, display, id, onChange }) {
  return (
    <CheckboxContainerStyled>
      {" "}
      <CheckBoxButtonStyled
        onClick={() => onChange(id, !value)}
        selected={value}
      >
        {value ? (
          <Check style={{ flexShrink: 0 }} size={16} weight="bold" />
        ) : null}
      </CheckBoxButtonStyled>
      <CheckBoxTextStyled>{display}</CheckBoxTextStyled>
    </CheckboxContainerStyled>
  );
}
