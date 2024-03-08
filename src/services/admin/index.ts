import { request } from "umi";
import { CameraDetail, FiberDetail, Guard, User } from "@/type";
// import { request } from "@@/plugin-request";
const prefix = "/api/admin";

function locationConverter<T>(item: any): T {
  if (item.location) return { ...item, location: JSON.parse(item.location) };
  else return item;
}

// admin后台 登陆, 登出
export const adminLogin = async (username: string, password: string) => {
  const { success, data, msg } = await request(`${prefix}/login`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
  return { success, data, msg };
};

export const adminLoginState = async () => {
  return request(`${prefix}/loginState`);
};

export const adminLogout = () => {
  return request(`${prefix}/logout`, {
    method: "POST",
  });
};
//
export const getFiberControl = (nameKw: string, archived: boolean) => {
  return request(`${prefix}/fiberDevice`, {
    params: { nameKw: nameKw ? nameKw : null, archived },
  });
};
export const addControl = (fiberDevice: any) => {
  return request(`${prefix}/fiberDevice`, {
    method: "POST",
    data: fiberDevice,
  });
};
export const updateControl = (id: number, fiberDevice: any) => {
  return request(`${prefix}/fiberDevice/${id}`, {
    method: "PUT",
    data: fiberDevice,
  });
};
export const setControlArchive = (id: number, archived: boolean) => {
  return request(`${prefix}/fiberDevice/${id}`, {
    method: "PUT",
    data: { archived },
  });
};
export const delControl = (id: number) => {
  return request(`${prefix}/fiberDevice/${id}`, { method: "DELETE" });
};
// 光纤查询
export const getFiber = (nameKw: string, archived: boolean) => {
  return request(`${prefix}/fiber`, {
    params: { nameKw: nameKw ? nameKw : null, archived },
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
export const addFiber = (fiber: {
  name: string;
  deviceId: number;
  location: string;
  identifier: number[];
  locationDesc: string;
  layingMethod: string;
  length: string;
}) => {
  return request(`${prefix}/fiber`, { method: "POST", data: fiber });
};

// 修改光纤信息(除了关联摄像头)
export const setFiberDetail = (id: number, fiber: Partial<FiberDetail>) => {
  return request(`${prefix}/fiber/${id}`, { method: "PUT", data: fiber });
};
export const setFiberArchive = (id: number, archived: boolean) => {
  return request(`${prefix}/fiber/${id}`, {
    method: "PUT",
    data: { archived },
  });
};

export const armFiber = (id: number) => {
  return request(`${prefix}/fiber/${id}/arm`, { method: "POST" });
};
export const disarmFiber = (id: number) => {
  return request(`${prefix}/fiber/${id}/disarm`, { method: "POST" });
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
export const getCamera = (nameKw: string, archived: boolean) => {
  return request(`${prefix}/camera`, {
    params: {
      nameKw: nameKw ? nameKw : null,
      archived,
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
export const addCamera = (camera: CameraDetail) => {
  return request(`${prefix}/camera`, {
    method: "POST",
    data: camera,
  });
};

// 更新摄像头
export const updateCamera = (
  cameraId: number,
  camera: Partial<CameraDetail>
) => {
  return request(`${prefix}/camera/${cameraId}`, {
    method: "PUT",
    data: camera,
  });
};
export const setCameraArchive = (cameraId: number, archived: boolean) => {
  return request(`${prefix}/camera/${cameraId}`, {
    method: "PUT",
    data: { archived },
  });
};

// 删除摄像头
export const delCamera = (cameraId: number) => {
  return request(`${prefix}/camera/${cameraId}`, {
    method: "DELETE",
  });
};

// 报警事件
export const getAlarmList = (
  props: {
    fiberId?: number | number[];
  },
  page?: number,
  pageSize?: number
) => {
  if (Array.isArray(props.fiberId)) {
    let url = "";
    props.fiberId.forEach((item, index) => {
      if (index !== 0) {
        url += "&";
      }
      url += `fiberId=${item}`;
    });
    return request(`${prefix}/alarm?${url}`, {
      params: { ...props, fiberId: undefined, page, pageSize },
    });
  }
  return request(`${prefix}/alarm`, { params: { ...props, page, pageSize } });
};

export const getAlarmDetail = (id: number) => {
  return request(`${prefix}/alarm/${id}`);
};

export const delAlarmDetail = (id: number) => {
  return request(`${prefix}/alarm/${id}`, { method: "DELETE" });
};

export const getGuard = (archived: boolean) => {
  return request(`${prefix}/guard`, {
    params: {
      archived,
    },
  });
};
export const updateGuard = (id: number, user: Guard) => {
  return request(`${prefix}/guard/${id}`, {
    method: "PUT",
    data: user,
  });
};
export const setGuardArchived = (id: number, archived: boolean) => {
  return request(`${prefix}/guard/${id}`, {
    method: "PUT",
    data: { archived },
  });
};
export const addGuard = (user: { name: string; nickname: string }) => {
  return request(`${prefix}/guard`, {
    method: "POST",
    data: user,
  });
};
export const delGuard = (id: number) => {
  return request(`${prefix}/guard/${id}`, {
    method: "DELETE",
  });
};
// 用户信息(不包括保安)
// type 0 = 超级管理员 1 = 管理员 2 = 主管
export const getUser = (type: number, nameKw: string, archived: boolean) => {
  return request(`${prefix}/user`, {
    params: {
      type: type === -1 ? null : type,
      nameKw: nameKw ? nameKw : null,
      archived,
    },
  });
};
export const addUser = (user: {
  name: string;
  nickname: string;
  type: number;
  password: number;
}) => {
  return request(`${prefix}/user`, {
    method: "POST",
    data: user,
  });
};
export const updateUser = (id: number, user: User) => {
  return request(`${prefix}/user/${id}`, {
    method: "PUT",
    data: user,
  });
};
export const updateUserPassword = (id: number, password: string) => {
  return request(`${prefix}/user/${id}`, {
    method: "PUT",
    data: { password },
  });
};
export const changeSelfPass = (currentPass: string, newPass: string) => {
  return request(`${prefix}/self`, {
    method: "PUT",
    data: { currentPass, newPass },
  });
};
export const setUserArchive = (id: number, archived: boolean) => {
  return request(`${prefix}/user/${id}`, {
    method: "PUT",
    data: { archived },
  });
};
export const delUser = (id: number) => {
  return request(`${prefix}/user/${id}`, {
    method: "DELETE",
  });
};

export const getTask = () => {
  return request(`${prefix}/task`);
};
export const getTaskDetail = (id: number) => {
  return request(`${prefix}/task/${id}`);
};

export const addTask = (
  name: string,
  time: { hour: number; minute: number },
  fibers: number[],
  configMap: { "0": any; "1": any }
) => {
  return request(`${prefix}/task`, {
    method: "POST",
    data: {
      name,
      hour: time.hour,
      minute: time.minute,
      affectFiberIds: fibers,
      configMap,
    },
  });
};
export const triggerTask = (id: number) => {
  return request(`${prefix}/task/{${id}}/trigger`, {
    method: "POST",
  });
};
export const delTask = (id: number) => {
  return request(`${prefix}/task/${id}`, {
    method: "DELETE",
  });
};

export const getLog = (page: number, pageSize: number) => {
  return request(`${prefix}/log`, {
    params: {
      page,
      pageSize,
    },
  });
};
