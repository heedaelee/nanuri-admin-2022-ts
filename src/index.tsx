import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

//어디서든 import axios 한 부분 다 커버함. 문제 없음
//개발시엔 axios의 default가 "/"
// axios.defaults.baseURL =
//   process.env.NODE_ENV === "development"
//     ? "/"
//     : "https://nanuri.app/api";

// ---> axios.tsx로 이동시킴

root.render(
  <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
    <App />
  </BrowserRouter>
);
