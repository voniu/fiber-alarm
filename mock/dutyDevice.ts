export default {
  "GET /api/guard/fiber": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 234321,
        name: "fiber test1",
        status: 1,
        location:
          "[[[40.60429492374685, 49.64732866578551], [40.60328820848655, 49.67083191777059]], [[40.60328820848655, 49.67083191777059], [40.590507295656835, 49.66875005204566]]]",
      },
      {
        id: 22228,
        name: "fiber test2",
        location:
          "[[[40.60429492374685, 49.64732866578551], [40.593697269816246, 49.64468776280052]], [[40.593697269816246, 49.64468776280052], [40.590507295656835, 49.66875005204566]]]",
      },
      {
        id: 112233,
        name: "fiber test1",
        location: "",
      },
      {
        id: 1,
        name: "fiber test11",
        location: "",
      },
      {
        id: 2,
        name: "fiber test111",
        location: "",
      },
      {
        id: 3,
        name: "fiber test3",
        location: "",
      },
      {
        id: 4,
        name: "fiber test14",
        location: "",
      },
      {
        id: 5,
        name: "fiber test14",
        location: "",
      },
      {
        id: 6,
        name: "fiber test14",
        location: "",
      },
      {
        id: 7,
        name: "fiber test14",
        location: "",
      },
      {
        id: 8,
        name: "fiber test14",
        location: "",
      },
      {
        id: 9,
        name: "fiber test14",
        location: "",
      },
      {
        id: 10,
        name: "fiber test14",
        location: "",
      },
      {
        id: 11,
        name: "fiber test14",
        location: "",
      },
      {
        id: 12,
        name: "fiber testENDEND",
        location: "",
      },
    ],
  },
  "GET  /api/guard/fiber/234321": {
    success: true,
    "m's'g": "xxxxxx错误",
    data: {
      id: 2213,
      name: "fiber test1",
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
    },
  },
  "GET  /api/guard/fiber/22228": {
    success: true,
    "m's'g": "xxxxxx错误",
    data: {
      id: 2213,
      name: "fiber test2",
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
    },
  },
  "GET  /api/guard/fiber/2213": {
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
    },
  },
  "GET /api/guard/camera": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 2132,
        name: "camera1",
        location: "[40.60429492374685, 49.64732866578551]",
        type: 0,
        form: 0,
      },
      {
        id: 98762,
        name: "camera2",
        location: "[40.590507295656835, 49.66875005204566]",
      },
    ],
  },

  "GET /api/guard/camera/2132": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 2132,
      name: "camera1",
      location: "[40.60429492374685, 49.64732866578551]",
    },
  },

  "GET /api/guard/camera/98762": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 98762,
      name: "camera2",
      location: "[40.590507295656835, 49.66875005204566]",
    },
  },
};
