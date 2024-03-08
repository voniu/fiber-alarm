export default {
  "GET /api/admin/fiber": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 234321,
        name: "fiber test1",
        device: {
          // 所属设备
          id: 123,
          name: "Device 1",
          type: 1,
        },
        location:
          "[[[40.60429492374685, 49.64732866578551], [40.60328820848655, 49.67083191777059]], [[40.60328820848655, 49.67083191777059], [40.590507295656835, 49.66875005204566]]]",
      },
      {
        id: 22228,
        name: "fiber test2",
        device: {
          // 所属设备
          id: 123,
          name: "Device 1",
          type: 0,
        },

        location:
          "[[[40.60429492374685, 49.64732866578551], [40.593697269816246, 49.64468776280052]], [[40.593697269816246, 49.64468776280052], [40.590507295656835, 49.66875005204566]]]",
      },
    ],
  },
  "GET  /api/admin/fiber/234321": {
    success: true,
    "m's'g": "xxxxxx错误",
    data: {
      id: 234321,
      name: "fiber test1",
      device: {
        // 所属设备
        id: 123,
        name: "Device 1",
        type: 0,
      },
      ip: "192.168.31.200",
      identifier: [1, 1],
      location:
        "[[[40.60429492374685, 49.64732866578551], [40.60328820848655, 49.67083191777059]], [[40.60328820848655, 49.67083191777059], [40.590507295656835, 49.66875005204566]]]",
      triggerCameras: [
        {
          id: 2132,
          name: "camera1",
          location: "[48.206151, 40.027136]",
        },
        {
          id: 98762,
          name: "camera2",
          location: "[42.206151, 43.027136]",
        },
      ],
    },
  },
  "GET  /api/admin/fiber/22228": {
    success: true,
    "m's'g": "xxxxxx错误",
    data: {
      id: 22228,
      name: "fiber test2",
      location:
        "[[[40.60429492374685, 49.64732866578551], [40.593697269816246, 49.64468776280052]], [[40.593697269816246, 49.64468776280052], [40.590507295656835, 49.66875005204566]]]",
      triggerCameras: [
        {
          id: 2132,
          name: "camera1",
          location: "[48.206151, 40.027136]",
        },
        {
          id: 98762,
          name: "camera2",
          location: "[42.206151, 43.027136]",
        },
      ],
      identifier: [0],
      device: {
        // 所属设备
        id: 123,
        name: "Device 1",
        type: 1,
      },
    },
  },
  "GET  /api/admin/fiber/2213": {
    success: true,
    "m's'g": "xxxxxx错误",
    data: {
      id: 2213,
      name: "门口光纤",
      location:
        "[[[48.206151, 40.027136], [49.206151, 41.027136]], [[49.206151, 41.027136], [42.206151, 43.027136]]]",
      triggerCameras: [
        {
          id: 2132,
          name: "camera1",
          location: "[48.206151, 40.027136]",
        },
        {
          id: 98762,
          name: "camera2",
          location: "[42.206151, 43.027136]",
        },
      ],
      device: {
        // 所属设备
        id: 123,
        name: "Device 1",
        type: 0,
      },
    },
  },
  "GET /api/admin/camera": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 2132,
        name: "camera1",
        location: "[40.60429492374685, 49.64732866578551]",
      },
      {
        id: 98762,
        name: "camera2",
        location: "[40.590507295656835, 49.66875005204566]",
      },
    ],
  },

  "GET /api/admin/camera/2132": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 2132,
      name: "camera1",
      location: "[40.60429492374685, 49.64732866578551]",
      ip: "192.168.21.1",
      username: "jack",
      password: "pppppp",
      picurl: "https://a.com",
      picport: "1111",
      videourl: "https://b.com",
      videoport: "2222",
    },
  },

  "GET /api/admin/camera/98762": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 98762,
      name: "camera2",
      location: "[40.590507295656835, 49.66875005204566]",
      triggeredByFibers: [
        {
          id: 2213,
          name: "门口光纤",
          location:
            "[[[48.206151, 40.027136], [49.206151, 41.027136]], [[49.206151, 41.027136], [42.206151, 43.027136]]]",
        },
      ],
    },
  },
  "GET /api/admin/fiberDevice": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 1,
        name: "fibercontrol1",
        type: 1,
        fiberNum: 10,
      },
      {
        id: 2,
        name: "fibercontrol2",
        type: 0,
        fiberNum: 10,
      },
    ],
  },
};
