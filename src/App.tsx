import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/templates/Dashboard";
import Layout from "./components/templates/Layout";
import MyProfile from "./components/templates/MyProfile";
import NotFound from "./components/templates/NotFound";
import PostListPage from "./components/templates/PostListPage";
import UsersListTemplate from "./components/templates/UserListPage";
import AppSuspense from "./lib/@crema/AppSuspense";
import AppThemeProvider from "./lib/@crema/AppThemeProvider";
import { useThemeContext } from "./lib/ThemeContextProvider";
import { UserAuthProvider } from "./lib/userAuthProvider/userAuthProvider";
import Login from "./pages/guestRouter/Login";
import KakaoCallBack from "./pages/KakaoCallBack";

//TODO: auth 인증 with router 만들기, in git, changed to app/auth branch
//NOTE:테마 안써 ㅅㅂ 테마 쓰지 말고 있는 Theme 다 지우고 걍 각각 찾아서 셋팅하자. 그게 더 좋고 공통테마 하기엔 낭비다 낭비!
declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const { theme } = useThemeContext();

  //토큰 얻기: 자동로그인 토큰 있고 새로고침시 로그인 창 한번 접속하는 것을 방지
  //        하기 위해 token이 있으면 아래 router 조건분기에서 login 조건을 타지 않게 함
  const storageData = localStorage.getItem("@loginInfo");
  let object = { token: "" };
  let token = "";

  if (storageData) {
    object = JSON.parse(storageData);
    if (object && object.token) {
      token = object.token;
    }
  }
  console.log(`token 확인 : ${token}`);

  useEffect(() => {
    console.log("App/useEffec() 동작", isLogin);
  }, [isLogin]);

  // const Logincom = React.lazy(
  //   () => import("./pages/guestRouter/Login")
  // );
  // const DashBoardLazy = React.lazy(
  //   () => import("./components/templates/Dashboard")
  // );

  console.log(`isLogin : ${isLogin}`);
  console.log(`window.location : ${window.location}`);
  console.log(`window.location : ${process.env.PUBLIC_URL}`);
  return (
    <AppThemeProvider>
      <UserAuthProvider isLogin={isLogin} setIsLogin={setIsLogin}>
        <AppSuspense>
          {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
          <Routes >
            {isLogin || token ? (
              <Route path="/nanuri-admin-2022-ts" element={<Layout />}>
                <Route path="/nanuri-admin-2022-ts" element={<Dashboard />} />
                <Route
                  path="/nanuri-admin-2022-ts/users"
                  element={<UsersListTemplate />}
                />
                <Route path="/nanuri-admin-2022-ts/contents" element={<PostListPage />} />
                <Route path="/nanuri-admin-2022-ts/profile" element={<MyProfile />} />
                <Route
                  path="/nanuri-admin-2022-ts/auth/kakao/callback"
                  element={<KakaoCallBack />}
                />
              </Route>
            ) : (
              <Route path="/nanuri-admin-2022-ts">
                <Route path="/nanuri-admin-2022-ts" element={<Login />} />
                <Route
                  path="/nanuri-admin-2022-ts/auth/kakao/callback"
                  element={<KakaoCallBack />}
                />
              </Route>
            )}
            <Route path="/nanuri-admin-2022-ts/*" element={<NotFound />} />
          </Routes>
          {/* </BrowserRouter> */}
        </AppSuspense>
      </UserAuthProvider>
    </AppThemeProvider>
  );
}

export default App;
