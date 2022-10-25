import axios from "axios";

console.log("process.env.NODE_ENV : ", process.env.NODE_ENV);
//https://localhost:443
const DjangoAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/"
      : "/", // YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});
export const DjangoFormHeaderAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/"
      : "/", // YOUR_API_URL HERE
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

DjangoAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response &&
      err.response.data.msg === "Token is not valid"
    ) {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);
// 헤더 2군데 모두 token 삽입
export const setAuthToken = (token?: string) => {
  if (token) {
    DjangoAxios.defaults.headers.common.Authorization = `Token ${token}`;
    DjangoFormHeaderAxios.defaults.headers.common.Authorization = `Token ${token}`;
    console.log("DjangoAxios 헤더 : ");
    console.log(DjangoAxios.defaults.headers.common.Authorization);
    console.log("DjangoFormHeaderAxios 헤더 : ");
    console.log(
      DjangoFormHeaderAxios.defaults.headers.common.Authorization
    );
    // localStorage.setItem("token", token);
  } else {
    delete DjangoAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("@loginInfo");
  }
};
export default DjangoAxios;
