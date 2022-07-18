import { Box } from "@mui/material";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import CheckBox from "../../components/atoms/Checkbox";
import Theme from "../../lib/Theme";
import InputBox from "../molecules/InputBox";
import kakaoLoginImg from "../../static/images/kakao_login_large_narrow.png";
import { NavigateFunction, useNavigate } from "react-router-dom";

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

function _loginWithKakao(navigate: NavigateFunction) {
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

  //NOTE:js sdk 사용시
  // window.Kakao.Auth.authorize({
  //   redirectUri: "http://localhost:3000/auth/kakao/callback",
  // });

  //NOTE:restAPI 사용시
  const CLIENT_ID = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;

  // navigate는 router 내부만..
  // navigate(KAKAO_AUTH_URL);
}

const LoginTemplate = ({
  autoLoginCheck,
  setAutoLoginCheck,
  state,
  setState,
  submit,
  validation,
}: LoginTemplateProps) => {
  let navigate = useNavigate();

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
        {/* 카카오 로그인 버튼 시작 */}
        <Box
          sx={{
            width: "307px",
            height: "58px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        >
          <img
            onClick={() => loginWithKakao(navigate)}
            src={kakaoLoginImg}
            alt={"kakao-login"}
            style={{ borderRadius: "4px" }}
          />
        </Box>
        {/* 카카오 로그인 버튼 끝 */}
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
