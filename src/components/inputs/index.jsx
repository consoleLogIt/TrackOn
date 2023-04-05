import React from "react";
import { TextInputStyled } from "./styled";

export default function TextInput({ placeholder, value, onChange }) {
  return (
    <div>
      <TextInputStyled
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}
