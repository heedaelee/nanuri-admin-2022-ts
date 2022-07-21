import { replace } from "formik";
import { userInfo } from "os";
import React, { createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserAuthProviderProps {
  children: React.ReactElement | Array<React.ReactElement>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: UserContextType = {
  setUserInfo: () => {},
  getUserInfo: (active?: any) => {},
  logout: () => {},
  user: {
    uuid: "",
  },
};

const UserContext = createContext(defaultContext);

const UserAuthProvider = ({
  children,
  isLogin,
  setIsLogin,
}: UserAuthProviderProps) => {
  useEffect(() => {
    //랜더링시 자동 작동
    getUserInfo();
  });

  //react-rotuer-dom 페이지 이동 useNavigate
  let navigate = useNavigate();

  //context user data
  let user = { uuid: "" };

  const setUserInfo: UserContextType["setUserInfo"] = async (
    token,
    uuid
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

      //uuid 할당
      user.uuid = uuid;

      const storageData = localStorage.getItem("@loginInfo");
      console.log(
        "userAuthProvider.tsx / localStorage.getItem : ",
        storageData
      );
      setIsLogin(true);
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

    const user = localStorage.getItem("@loginInfo");
    user
      ? setIsLogin(true)
      : console.log("user데이터 없음 in userActionProvider.tsx");
  };

  const logout = (): void => {
    localStorage.removeItem("@loginInfo");
    console.log(
      "토큰삭제 후 확인 getItem : ",
      localStorage.getItem("@loginInfo")
    );
    !localStorage.getItem("@loginInfo") && setIsLogin(false);
    navigate("/", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        getUserInfo,
        logout,
        user,
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
