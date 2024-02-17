// import { message } from "antd";
import { message } from "antd";
import type { RequestConfig } from "umi";
import { baseUrl } from "./constant";

const errorHandler = (error: any) => {
  const { response, data } = error;
  if (response && response.status) {
    const errorText = "An error occurred and try again later.";
    if (response.data) {
      message.error(response.data.msg);
    } else message.error(errorText);
    return;
  }

  if (!response && !data) {
    message.error("An error occurred and try again later.");
  } else if (data) {
    message.error(data.ret.msg);
  }
};
export const request: RequestConfig = {
  baseURL: process.env.mock ? `http://${baseUrl}` : "",
  // timeout: 1000,
  errorConfig: { errorHandler },
  requestInterceptors: [],
  responseInterceptors: [
    (res: any) => {
      // const { success, msg } = res;
      // console.log(res);

      // if (!success) {
      //   message.error(msg);
      // }
      return res;
    },
  ],
};

export async function getInitialState(): Promise<{ type?: number }> {
  return {};
}
