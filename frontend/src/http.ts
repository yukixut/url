import axios, { AxiosResponse } from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 60 * 1000,
});

export interface AjaxResult<T = unknown> {
  /**
   *
   */
  success: boolean;
  /**
   *
   */
  msg: string;
  /**
   *
   */
  data: T;
}

http.interceptors.response.use(
  (res) => {
    return {
      success: res.data.success,
      data: res.data.data,
      msg: res.data.message,
    } as unknown as AxiosResponse<any>;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
