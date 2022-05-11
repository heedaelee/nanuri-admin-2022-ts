import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";

interface TextInputProps {
  value: string;
  onChange: (value: any) => void;
  name: string;
  placeholder: string;
  style?: React.CSSProperties;
  inputSize: "medium" | "full" | "modal" | "small";
  type?: string;
  maxLength?: number;
}

const TextInput = ({
  value,
  onChange,
  name,
  placeholder,
  inputSize,
  type = "text",
  maxLength,
}: TextInputProps) => {
  return (
    <InputTextBox
      maxLength={maxLength}
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      name={name}
      type={type}
      inputSize={inputSize}
      placeholder={placeholder}
    />
  );
};

const handleWidthType = (
  inputSize: TextInputProps["inputSize"]
) => {
  switch (inputSize) {
    case "medium":
      return "307px";
    case "full":
      return "307px";
    case "modal":
      return "307px";
    case "small":
      return "307px";
    default:
      return "307px";
  }
};

const handleHeightType = (
  inputSize: TextInputProps["inputSize"]
) => {
  switch (inputSize) {
    case "medium":
      return "56px";
    case "full":
      return "56px";
    case "modal":
      return "56px";
    case "small":
      return "56px";
    default:
      return "56px";
  }
};

const InputTextBox = styled.input<TextInputProps>`
  font-size: 20px;
  display: flex;
  align-items: center;
  width: ${({ inputSize }) => handleWidthType(inputSize)};
  height: ${({ inputSize }) => handleHeightType(inputSize)};
  border: none;
  padding: 1vw;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: ${Theme.fonts.fontFamily};
    color: ${Theme.color.gray[2]};
    font-style: "normal";
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  :-ms-input-placeholder {
    font-family: ${Theme.fonts.fontFamily};
    color: ${Theme.color.gray[2]};
    font-style: "normal";
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  :focus::-webkit-input-placeholder {
    color: transparent;
  }
  :focus::-ms-input-placeholder {
    color: transparent;
  }
  :focus {
    outline-color: #539752;
  }
`;

export default TextInput;
