import React from "react";
import CheckBox from "../../components/atoms/Checkbox";
import Button from "../../components/atoms/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import TextInput from "../atoms/Inputs";
import InputBox from "../molecules/InputBox";
interface LoginTemplateProps {
  autoLoginCheck: boolean;
  setAutoLoginCheck: (value: boolean) => void;
  state: {
    email: string;
    password: string;
  };
  setState: {
    setEmail: (active: string) => void;
    setPassword: (active: string) => void;
  };
  submit: () => void;
  validation: {
    email: {
      isEmail: boolean;
      setIsEmail: (active: boolean) => void;
    };
    password: {
      isPassword: boolean;
      setIsPassword: (active: boolean) => void;
    };
  };
}

const LoginTemplate = ({
  autoLoginCheck,
  setAutoLoginCheck,
  state,
  setState,
  submit,
  validation,
}: LoginTemplateProps) => {
  return (
    <LoginContainer>
      <DataRow>
        <TitleRow>
          <TitleText>NANURI</TitleText>
        </TitleRow>
        <InpuxBoxContainer>
          <InpuxTextRow>
            <KeyText>이메일</KeyText>
            <InputBox
              value={state.email}
              onChange={setState.setEmail}
              name={"id"}
              placeholder="아이디를 입력해주세요"
              inputSize="medium"
              maxLength={30}
              setValidationState={validation.email.setIsEmail}
              validationState={validation.email.isEmail}
              validationType={"email"}
            />
          </InpuxTextRow>
          <InputRowSpace1 />
          <InpuxTextRow>
            <KeyText>비밀번호</KeyText>
            <InputBox
              value={state.password}
              onChange={setState.setPassword}
              name={"password"}
              placeholder="비밀번호를 입력해주세요"
              inputSize="medium"
              type="password"
              maxLength={20}
              setValidationState={validation.password.setIsPassword}
              validationState={validation.password.isPassword}
              validationType={"password"}
            />
          </InpuxTextRow>
        </InpuxBoxContainer>
        <Row1 />
        <Button onClick={submit} size="medium" animation="active">
          로그인
        </Button>
        <BottomLoginMenu>
          <BottomLoginWrapper>
            <CheckBox
              text="자동로그인"
              state={autoLoginCheck}
              setState={setAutoLoginCheck}
              labelStyle={{
                fontFamily: "test",
                fontWeight: 500,
                fontSize: "18px",
                color: Theme.color.gray[2],
              }}
            />
            <BottomLgoinMenuText>회원가입</BottomLgoinMenuText>
          </BottomLoginWrapper>
          <BottomLgoinMenuText>아이디/비번찾기</BottomLgoinMenuText>
        </BottomLoginMenu>
      </DataRow>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  font-family: "PretendardVariable";
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`;
const DataRow = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid lightgray; */
  margin-top: 25vh;
  margin-bottom: 25vh;
`;
const Row = styled.div`
  /* border: 1px solid black; */
  height: 25%;
  flex: 1;
`;

const TitleRow = styled.div`
  /* border: 1px solid black; */
  text-align: center;
  margin-bottom: 5vh;
`;

const TitleText = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 55px;
  line-height: 35px;
  /* border: 1px solid black; */
`;

const InpuxBoxContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
`;
const InpuxTextRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;
`;
const KeyText = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 35px;
`;

const InputRowSpace1 = styled.div`
  height: 27px;
`;
const Row1 = styled.div`
  height: 40px;
`;

const BottomLoginMenu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  /* border: 1px solid black; */
  margin-top: 12px;
`;
const BottomLgoinMenuText = styled.p`
  font-family: ${Theme.fonts.fontFamily};
  font-weight: 500;
  font-size: 18px;
  color: ${Theme.color.gray[2]};
  margin: 0;
  cursor: pointer;
`;

const BottomLoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default LoginTemplate;
