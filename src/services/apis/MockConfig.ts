import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock 용(7.27일날 real server로 changed)
const jwtAxios = axios.create({
  baseURL: "/", // YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});

//AxiosInstance 생성
export default new MockAdapter(jwtAxios, {
  delayResponse: 100,
  onNoMatch: "throwException",
});

// export default new MockAdapter(axios, { delayResponse: 100 });
// export const Axios = axios;
export const Axios = jwtAxios;
