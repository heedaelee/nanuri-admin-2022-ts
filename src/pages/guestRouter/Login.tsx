import React, { useContext, useEffect, useState } from "react";
import LoginTemplate from "../../components/templates/LoginTemplate";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
import { UserContext } from "../../lib/userAuthProvider/userAuthProvider";
import { uuidv4 } from "../../lib/util/otherUtills";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  useEffect(() => {}, []);
  const { setUserInfo } = useContext(UserContext);
  const [autoLoginCheck, setAutoLoginCheck] =
    useState<boolean>(false);

  //email & password
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);

  const submit = () => {
    // console.log("Login/Button/submit fn 작동");
    // console.log(`email : ${email}, password : ${password} 
    // loginType : 'email', isAutoLogin : ${autoLoginCheck}
    // `);
    // let isLogin = true;
    // let loginType = "e";

    // const postData = JSON.stringify({
    //   id: 1,
    //   email: email,
    //   password: password,
    //   isLogin: isLogin,
    //   loginType: loginType,
    // });

    //NOTE:일단 일반 로그인 보류
    // const token = "1234abcd";
    // setUserInfo(uuidv4(), token);

    //NOTE:일단 Login 클릭시 지정된 정보로 Localstorage.setItem 으로 set 하기!
    /*DONE:
      1. 페이지 template 컴포넌트분리
      2. input hook 만들기
      3. submit에 연동
    */
  };

  return (
    <LoginTemplate
      autoLoginCheck={autoLoginCheck}
      setAutoLoginCheck={setAutoLoginCheck}
      state={{ email, password }}
      setState={{ setEmail, setPassword }}
      submit={submit}
      validation={{
        email: { isEmail, setIsEmail },
        password: { isPassword, setIsPassword },
      }}
    />
  );
};

export default Login;
