import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostListPage from "./components/templates/PostListPage";
import Dashboard from "./components/templates/Dashboard";
import Layout from "./components/templates/Layout";
import NotFound from "./components/templates/NotFound";
import UsersListTemplate from "./components/templates/UserListPage";
import { useThemeContext } from "./lib/ThemeContextProvider";
import { UserAuthProvider } from "./lib/userAuthProvider/userAuthProvider";
import Login from "./pages/guestRouter/Login";
import AppThemeProvider from "./lib/@crema/AppThemeProvider";
import MyProfile from "./components/templates/MyProfile";
import KakaoCallBack from "./pages/KakaoCallBack";
import axios from "axios";

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
  useEffect(() => {
    console.log("App/useEffec() 동작", isLogin);
  }, [isLogin]);

  return (
    <AppThemeProvider>
      <UserAuthProvider isLogin={isLogin} setIsLogin={setIsLogin}>
        <Routes>
          {isLogin ? (
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersListTemplate />} />
              <Route path="/contents" element={<PostListPage />} />
              <Route path="/profile" element={<MyProfile />} />
            </Route>
          ) : (
            <Route path="/">
              <Route path="/" element={<Login />} />
              <Route
                path="/auth/kakao/callback"
                element={<KakaoCallBack />}
              />
            </Route>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </UserAuthProvider>
    </AppThemeProvider>
  );
}

export default App;
