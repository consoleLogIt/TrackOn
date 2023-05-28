import React, { useEffect, useRef, useState } from "react";
import {
  DropdownContainerStyled,
  DropdownSelectBoxStyled,
  OptionsItemStyled,
  OptionsWrapperStyled,
} from "./styled";
import { greyBorder } from "../../colors";

export default function Dropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(options[1]);
  const currentValue = value || options[1];

  const selectedValue   = options.find(d=>d.value===currentValue)


  console.log({currentValue,options})


  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainerStyled ref={ref}>
      <DropdownSelectBoxStyled onClick={() => setOpen(true)}>
        {selectedValue?.display}
      </DropdownSelectBoxStyled>
      {open ? (
        <OptionsWrapperStyled>
          {options.map((d) => (
            <OptionsItemStyled
              onClick={() => {
                onChange(d);
                setOpen(false);
              }}
            >
              {d.display}
            </OptionsItemStyled>
          ))}
        </OptionsWrapperStyled>
      ) : null}
    </DropdownContainerStyled>
  );
}
