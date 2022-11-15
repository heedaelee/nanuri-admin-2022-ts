import { useContext, useEffect, useState } from "react";
import LoginTemplate from "../../components/templates/LoginTemplate";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
import { Auth, jsonHeader, User } from "../../lib/apiSite/apiSite";
import DjangoAxios from "../../lib/apiSite/axios";
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
    console.log("Login/Button/submit fn 작동");
    console.log(`email : ${email}, password : ${password}
    loginType : 'email', isAutoLogin : ${autoLoginCheck}
    `);
    let isLogin = true;
    let loginType = "e";

    /* 
    const postData = {
      uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      email: "user@example.com",
      nickname: "string",
      is_active: true,
      is_admin: true,
      last_login: "2022-11-11T07:59:02.858Z",
      profile: "string",
      auth_provider: "APPLE",
      location: "string",
      posts: [""],
      favorite_posts: [""],
      updated_at: "2022-11-11T07:59:02.858Z",
      created_at: "2022-11-11T07:59:02.858Z",
      address: "",
    };
    //NOTE:일단 일반 로그인 보류
     const token = "1234abcd";
     setUserInfo(postData, token);
      */

    /*
    TODO: 이렇게 하지 말고, id, pw 만들어서 입력시키면 조건문
    만들어서 일치하면 내 kakaoID 코드에 넣어서 서버로 axios 통신을 통해 실제 로그인 시키는 
    방식으로 가자!!
    아래: 카카오 내 ID
    */

    if (email === "nanuri@com" && password === "123") {
      /** 통신
       * Type: POST
       * To:우리서버,
       * For:kakaoID로 로그인, 토큰 받아오기
       * res: type, token, uuid
       * */
      const kakaoId = "2346235060";
      console.log("test : ", Auth.SIGN_IN_API);
      const postData = { kakao_id: kakaoId };

      DjangoAxios.post(Auth.SIGN_IN_API, postData, jsonHeader).then(
        (res) => {
          if (res.data.token && res.data.uuid) {
            console.log("res.data : ", res.data);
            const ourServerToken = res.data.token;
            const uuid = res.data.uuid;
            /** 통신
             * Type: GET
             * To:우리서버,
             * For:USER 정보 받아오기
             * res: posts:[], favorite_posts:[], other user info..
             * */
            //FORTEST: Test용
            // setUserInfo(res.data, ourServerToken);

            //NOTE:실제 사용
            DjangoAxios.get(User.ALL + uuid + "/", {
              headers: {
                Authorization: `Token ${ourServerToken}`,
              },
            }).then((res) => {
              if (res.data) {
                console.log("res.data :");
                console.log(res.data);
                if (res.data.is_admin) {
                  setUserInfo(res.data, ourServerToken);
                } else {
                  console.log("admin false");
                  window.alert(
                    "권한이 없습니다 \n 관리자에게 문의하세요 :("
                  );
                }
              } else {
                console.log("user data 없음!");
              }
            });
          } else {
            if (!res.data.token) {
              console.log("우리 token 없음!");
            }
            if (!res.data.uuid) {
              console.log("uuid 없음!");
            }
          }
        }
      );
    } else {
      console.log("kakaoId 없음!");
    }

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
