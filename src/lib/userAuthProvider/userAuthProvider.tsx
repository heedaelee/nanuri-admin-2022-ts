import React, { createContext, useEffect } from "react";

interface UserAuthProviderProps {
  children: React.ReactElement | Array<React.ReactElement>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: UserContextType = {
  setUserInfo: () => {},
  getUserInfo: (active?: any) => {},
  logout: () => {},
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

  const setUserInfo: UserContextType["setUserInfo"] = async (
    id,
    email,
    token,
    loginType,
    isLogin
  ) => {
    try {
      localStorage.setItem(
        "@loginInfo",
        JSON.stringify({
          id: id,
          email: email,
          token: token,
          isLogin: isLogin,
          loginType: loginType,
        })
      );

      const storageData = localStorage.getItem("@loginInfo");
      console.log("userAuthProvider.tsx / localStorage.getItem : ", storageData);

      setIsLogin(true)
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
  };
  return (
    <UserContext.Provider
      value={{
        setUserInfo,
        getUserInfo,
        logout,
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
