import React, { useEffect } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  useEffect(() => {}, []);

  return (
    <LoginContainer>
      <DataRow>
        <TitleRow>
          <TitleText>NANURI</TitleText>
        </TitleRow>
        <InpuxBox>
          <InpuxTextRow>
            <KeyText>아이디</KeyText>
            <InputTextBox
              name={"id"}
              type={"text"}
              placeholder="아이디를 입력해주세요"
            ></InputTextBox>
          </InpuxTextRow>
          <InputRowSpace1 />
          <InpuxTextRow>
            <KeyText>비밀번호</KeyText>
            <InputTextBox
              type={"password"}
              name={"password"}
              placeholder="비밀번호를 입력해주세요"
            ></InputTextBox>
          </InpuxTextRow>
        </InpuxBox>
        <Row1 />
        <Button>로그인</Button>
        <BottomLoginMenu>
          <BottomLgoinMenuText>회원가입</BottomLgoinMenuText>
          <BottomAutoLoginWrapper>
            <CheckBox type={"checkbox"} name="checkbox" />
            <BottomLgoinMenuText>자동로그인</BottomLgoinMenuText>
          </BottomAutoLoginWrapper>
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
  border: 1px solid black;
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

const InpuxBox = styled.div`
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

const InputTextBox = styled.input.attrs(() => ({}))`
  font-size: 20px;
  display: flex;
  align-items: center;
  width: 307px;
  height: 56px;
  border: 1px solid #646363;
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

const InputRowSpace1 = styled.div`
  height: 27px;
`;
const Row1 = styled.div`
  height: 40px;
`;

const Button = styled.button`
  width: 307px;
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${Theme.color.green[1]};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  /* transition: 0.25s; */
  transition-duration: 0.3s;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  color: white;

  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    transform: scale(1);
    position: relative;
    top: 4px;
  }
  &:hover {
    letter-spacing: 2px;
    transform: scale(1.2);
    background: ${Theme.color.green[1]};
  }
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
const BottomLgoinMenuText = styled.h1`
  font-family: ${Theme.fonts.fontFamily};
  font-weight: 500;
  font-size: 18px;
  color: ${Theme.color.gray[2]};
  margin: 0;
  cursor: pointer;
`;

const BottomAutoLoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const CheckBox = styled.input``;

export default Login;
