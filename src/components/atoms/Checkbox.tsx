import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";

interface CheckboxProps {
  setState: (value: boolean) => void;
  state: boolean;
  text?: string;
  labelStyle?: React.CSSProperties;
}

function Checkbox({
  text,
  setState,
  state,
  labelStyle,
}: CheckboxProps) {
  return (
    <StyledLabel htmlFor={text}>
      <StyledInput
        type="checkbox"
        id={text}
        name={text}
        onClick={() => {
          setState(!state);
        }}
      />
      <StyledP style={labelStyle}>{text}</StyledP>
    </StyledLabel>
  );
}
//완
const StyledInput = styled.input`
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  border: 2.4px solid gainsboro;
  border-radius: 0.56rem;
  cursor: pointer;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${Theme.color.green[1]};
  }
`;

const StyledLabel = styled.label`
  /* border: 1px solid black; */
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  padding: 0 0.25rem;
  margin: 0;
  cursor: pointer;
`;

export default Checkbox;
