import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default new MockAdapter(axios, { delayResponse: 100 });

export const Axios = axios;
