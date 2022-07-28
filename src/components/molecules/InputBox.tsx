import React from "react";
import styled from "styled-components";
import { Validation } from "../../lib/Validation";
import TextInput from "../atoms/Inputs";
import { ErrorText } from "../atoms/Text";

interface InputBoxProps {
  value: string;
  onChange: (value: any) => void;
  name: string;
  placeholder: string;
  style?: React.CSSProperties;
  inputSize: "medium" | "full" | "modal" | "small";
  valueForPW?: string;
  type?: string;
  validationType?: string;
  validationState?: boolean;
  setValidationState?: (active: boolean) => void;
  //email 등 기존에 있는 데이터인지에 대한 유효성 검사 -->시작, 회원가입시 적용
  checkedExist?: string;
  setCheckedExist?: (active: string) => void;
  // --> 끝
  maxLength?: number;
}

const InputBox = ({
  value,
  onChange,
  name,
  placeholder,
  inputSize,
  type,
  style,
  valueForPW,
  validationType,
  validationState,
  setValidationState,
  checkedExist,
  setCheckedExist,
  maxLength,
}: InputBoxProps) => {
  // console.log("val:", validationType);
  return (
    <InputBoxWrapper>
      <TextInput
        value={value}
        onChange={onChange}
        name={name}
        inputSize={inputSize}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
      />
      {validationType &&
      value &&
      validationState !== undefined &&
      setValidationState !== undefined ? (
        <Validation
          type={validationType}
          state={value}
          valueForPW={valueForPW}
          validationState={validationState}
          setValidationState={setValidationState}
          checkedExist={checkedExist}
          setCheckedExist={setCheckedExist}
        />
      ) : null}
      {/* ->  Validation */}
    </InputBoxWrapper>
  );
};

const InputBoxWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export default InputBox;
