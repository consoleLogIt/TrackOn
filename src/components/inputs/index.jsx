import React, { useEffect, useRef } from "react";
import { TextInputStyled } from "./styled";

export default function TextInput({ placeholder, value, onChange }) {
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => ref.current.focus(), 300);
  }, []);
  return (
    <div>
      <TextInputStyled
        type="text"
        ref = {ref}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
