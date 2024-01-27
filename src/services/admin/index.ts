import { CameraDetil, FiberDetil, User } from "@/type";
import { request } from "@@/plugin-request";
const prefix = "/api/admin";

function locationConverter<T>(item: any): T {
  return { ...item, location: JSON.parse(item.location) };
}

// admin后台 登陆, 登出
export const adminLogin = (username: string, password: string) => {
  return request(`${prefix}/login`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
};

export const adminLogout = () => {
  return request(`${prefix}/logout`, {
    method: "POST",
  });
};

// 光纤查询
export const getFiber = (nameKw?: string) => {
  return request(`${prefix}/fiber`, {
    params: { nameKw },
  }).then((res) => {
    if (!res.success) return res;
    res.data = res.data.map(locationConverter);
    return res;
  });
};

// 光纤详情
export const getFiberDetail = (id: number) => {
  return request(`${prefix}/fiber/${id}`).then((res) => {
    if (!res.success) return res;
    res.data = locationConverter(res.data);
    return res;
  });
};

// 修改光纤信息(除了关联摄像头)
export const setFiberDetail = (id: number, fiber: Partial<FiberDetil>) => {
  return request(`${prefix}/fiber/${id}`, { method: "PUT", data: fiber });
};

// 删除光纤
export const delFiber = (id: number) => {
  return request(`${prefix}/fiber/${id}`, { method: "DELETE" });
};

// 关联摄像头
export const setFiberCamera = (fiberId: number, cameraId: number) => {
  return request(`${prefix}/fiber/${fiberId}/trigCamera/${cameraId}`, {
    method: "PUT",
  });
};

// 解除摄像头
export const delFiberCamera = (fiberId: number, cameraId: number) => {
  return request(`${prefix}/fiber/${fiberId}/trigCamera/${cameraId}`, {
    method: "DELETE",
  });
};

// 摄像头
export const getCamera = (nameKw: string) => {
  return request(`${prefix}/camera`, {
    params: {
      nameKw,
    },
  }).then((res) => {
    if (!res.success) return res;
    res.data = res.data.map(locationConverter);
    return res;
  });
};

// 摄像头详情
export const getCameraDetail = (id: number) => {
  return request(`${prefix}/camera/${id}`).then((res) => {
    if (!res.success) return res;
    res.data = locationConverter(res.data);
    return res;
  });
};

// 创建摄像头
export const addCamera = (camera: CameraDetil) => {
  return request(`${prefix}/camera`, {
    method: "PUT",
    data: camera,
  });
};

// 更新摄像头
export const updateCamera = (
  cameraId: number,
  camera: Partial<CameraDetil>
) => {
  return request(`${prefix}/camera/${cameraId}`, {
    method: "POST",
    data: camera,
  });
};

// 删除摄像头
export const delCamera = (cameraId: number) => {
  return request(`${prefix}/camera/${cameraId}`, {
    method: "DELETE",
  });
};

// 报警事件
export const getAlarmList = (props: {
  fiberId?: number;
  page?: number;
  pageSize?: number;
}) => {
  if (props.fiberId === 0) delete props.fiberId;
  return request(`${prefix}/alarm`, { params: props });
};

export const getAlarmDetail = (id: number) => {
  return request(`${prefix}/alarm/${id}`);
};

export const delAlarmDetail = (id: number) => {
  return request(`${prefix}/alarm/${id}`, { method: "DELETE" });
};

// 用户信息(不包括保安)
// type 0 = 超级管理员 1 = 管理员 2 = 主管
export const getUser = (type: number, nameKw: string) => {
  return request(`${prefix}/user`, {
    params: {
      type,
      nameKw,
    },
  });
};
export const addUser = (user: User) => {
  return request(`${prefix}/user`, {
    method: "PUT",
    data: user,
  });
};
export const updateUser = (id: number, user: User) => {
  return request(`${prefix}/user/${id}`, {
    method: "PUT",
    data: user,
  });
};
export const delUser = (id: number) => {
  return request(`${prefix}/user/${id}`, {
    method: "DELETE",
  });
};