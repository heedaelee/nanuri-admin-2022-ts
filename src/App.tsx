import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./app.css";
import Login from "./components/templates/Login";
import Main from "./components/templates/Dashboard";
import NotFound from "./components/templates/NotFound";

//TODO: auth 인증 with router 만들기



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
