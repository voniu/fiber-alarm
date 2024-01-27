// import { message } from "antd";
import type { RequestConfig } from "umi";

export const request: RequestConfig = {
  timeout: 1000,
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
