import axios from "axios";
import { replace } from "formik";
import { userInfo } from "os";
import React, { createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import { loginWithKakao } from "../../modules/authModule";
import { User } from "../apiSite/apiSite";

interface UserAuthProviderProps {
  children: React.ReactElement | Array<React.ReactElement>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: UserContextType = {
  setUserInfo: () => {},
  getUserInfo: (active?: any) => {},
  logout: () => {},
  contextUserData: {},
};

const UserContext = createContext(defaultContext);
let isComm: any;

const UserAuthProvider = ({
  children,
  isLogin,
  setIsLogin,
}: UserAuthProviderProps) => {
  // const [isComm, setIsComm] = useBoolean(false);

  useEffect(() => {
    //랜더링시 자동 작동
    console.log(window.location.pathname);
    if (window.location.pathname !== "/auth/kakao/callback")
      getUserInfo();
  }, []);

  //react-rotuer-dom 페이지 이동 useNavigate
  let navigate = useNavigate();

  //context user data
  let contextUserData: any;

  const setUserInfo: UserContextType["setUserInfo"] = async (
    userData,
    token
  ) => {
    try {
      // NOTE: '22/07/21, localStorage에는 accessKey만 저장하는게 좋겠음.
      // 일반 앱 가동시엔 context에 uuid 저장하고, uuid없을땐 서버에서 갖고 오도록 하고..
      localStorage.setItem(
        "@loginInfo",
        JSON.stringify({
          token: token,
        })
      );

      //userData 할당
      contextUserData = userData;
      console.log("setUserInfo 내에 contextUserData : ");
      console.log(contextUserData);

      const storageData = localStorage.getItem("@loginInfo");
      console.log(
        "userAuthProvider.tsx / localStorage.getItem : ",
        storageData
      );
      setIsLogin(true);
      navigate("/", { replace: true });
      /* Redux설치시, 
          user Data가 있을시 set to Redux 부분을 여기서 해준다. */
    } catch (e) {
      console.log(`error in setUserInfo() : ${e}`);
    }
  };

  //원래는 :
  //localStorage에 정보를 읽어 서버에 호출후 로그인 데이터를 받아온다. 그리고 로컬에 기입한다.
  const getUserInfo = (): void => {
    console.log("1.getUserInfo 호출됨");

    let storageData = localStorage.getItem("@loginInfo");
    let object = { token: "" };
    let token = "";

    if (storageData) {
      object = JSON.parse(storageData);
      if (object && object.token) {
        token = object.token;
      }
    }

    if (token) {
      if (!contextUserData?.uuid) {
        //uuid가 없다면
        /** 통신
         * Type: GET
         * To:우리서버,
         * For:USER 정보 받아오기
         * res: posts:[], favorite_posts:[], other user info..
         * */

        console.log("getUserInfo uuid가 없어서 카카오로그인 호출");
        console.log(contextUserData)
        // setIsLogin(true);
        loginWithKakao();
      } else {
        console.log("====================================");
        console.log("getUserInfo uuid가 있음 카카오로그인 호출");
        console.log(contextUserData);
        console.log("====================================");
      }
    } else {
      //토큰 없을시
      console.log("토큰데이터 없음 in userActionProvider.tsx");
      // loginWithKakao();
    }
  };

  const logout = (): void => {
    localStorage.removeItem("@loginInfo");
    console.log(
      "토큰삭제 후 확인 getItem : ",
      localStorage.getItem("@loginInfo")
    );
    !localStorage.getItem("@loginInfo") && setIsLogin(false);
    // true : 뒤로가기 불가능
    navigate("/", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        getUserInfo,
        logout,
        contextUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserAuthProvider, UserContext };

// App.tsx 의 return 부분에서 이 컴포넌트 UserProvider를 부모로 해서 전략적으로
// 사용하기 위해 export한거고(optional)
// createConext(value)의 리턴값인 UserContext는 #15행의 defaultContext값처럼
// 어디서든 사용하기 위해 이건, 필수적으로 export 헤줘야 한다.
