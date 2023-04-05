import { ArrowLeft, ArrowRight, Plus } from "phosphor-react";
import React from "react";
import { ButtonContainerStyled } from "./styled";

const icons = { ArrowLeft: ArrowLeft, ArrowRight: ArrowRight, Plus: Plus };

export default function Button({
  onClick,
  children,
  icon,
  bgColor,
  textColor,
}) {
  const IconComp = icons[icon];
  const composition = icon && children ? "text+icon" : icon ? "icon" : "text";

  return (
    <ButtonContainerStyled
      composition={composition}
      onClick={onClick}
      textColor={textColor}
      bgColor={bgColor}
    >
      {IconComp ? <IconComp size={17} /> : null}
      {children}
    </ButtonContainerStyled>
  );
}
