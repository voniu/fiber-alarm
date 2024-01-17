import { request } from "@@/plugin-request";
const prefix = "/api/monitor";
// 主管登陆, 登出
export const monitorLogin = async (username: string, password: string) => {
  const { data } = await request(`${prefix}/login`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
  return data;
};

export const monitorLogout = () => {
  return request(`${prefix}/logout`, {
    method: "POST",
  });
};

// 获取保安列表
export const getGuards = async () => {
  const { data } = await request(`${prefix}/guards`);
  return data;
};

// 进入值班
export const onDuty = async (guardID: number) => {
  return request(`${prefix}/onduty`, {
    method: "POST",
    data: {
      guardID,
    },
  });
};

// 退出值班
export const offDuty = (username: string, password: string) => {
  return request(`${prefix}/offduty`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
};
