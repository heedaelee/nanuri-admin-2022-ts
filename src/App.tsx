import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./app.css";
import Login from "./pages/guestRouter/Login";
import Layout from "./components/templates/Dashboard";
import NotFound from "./components/templates/NotFound";
import {UserAuthProvider} from "./lib/userAuthProvider/userAuthProvider";

//TODO: auth 인증 with router 만들기, in git, changed to app/auth branch

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log("App/useEffec() 동작", isLogin);
  }, [isLogin]);

  
  return (
    <UserAuthProvider
      isLogin={isLogin}
      setIsLogin={setIsLogin}
    >
      <BrowserRouter>
        <Routes>
          {isLogin ? (
            <Route path="/" element={<Layout />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserAuthProvider>
  );
}

export default App;
