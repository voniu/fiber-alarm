// ./mock/users.ts
export default {
  // 返回值可以是数组形式
  "GET /api/view/fiber": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 234321,
        name: "门口光纤",
        location:
          "[[[48.206151, 40.027136], [49.206151, 41.027136]], [[49.206151, 41.027136], [42.206151, 43.027136]]]",
      },
      {
        id: 22228,
        name: "窗户光纤",
        location:
          "[[[46.606151, 41.127136], [43.406151, 41.927136]], [[43.406151, 41.927136], [44.206151, 44.027136]]]",
      },
    ],
  },

  "GET  /api/view/fiber/2213": {
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
          name: "门口摄像头1",
          location: "[48.206151, 40.027136]",
        },
        {
          id: 98762,
          name: "楼顶监控78",
          location: "[42.206151, 43.027136]",
        },
      ],
    },
  },

  "GET  /api/view/fiber/22228": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 22228,
      name: "窗户光纤",
      location:
        "[[[46.606151, 41.127136], [43.406151, 41.927136]], [[43.406151, 41.927136], [44.206151, 44.027136]]]",
    },
  },

  "GET /api/view/camera": {
    success: true,
    msg: "xxxxxx错误",
    data: [
      {
        id: 2132,
        name: "门口摄像头1",
        location: "[48.206151, 40.027136]",
      },
      {
        id: 98762,
        name: "楼顶监控78",
        location: "[42.206151, 43.027136]",
      },
    ],
  },

  "GET /api/view/camera/2132": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 2132,
      name: "门口摄像头1",
      location: "[48.206151, 40.027136]",
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

  "GET /api/view/camera/98762": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 98762,
      name: "楼顶监控78",
      location: "[42.206151, 43.027136]",
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

  "GET /api/view/alarm": {
    success: true,
    msg: "xxxxxx错误",
    page: 1,
    pageSize: 20,
    total: 1,
    data: [
      {
        id: 1221221,
        time: 1699776612322, //unix时间戳
        fiber: {
          id: 234321,
          name: "门口光纤",
        },
        description: "入侵警报",
        previewUrl:
          "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
      },
      {
        id: 12212287,
        time: 1699776612322, //unix时间戳
        fiber: {
          id: 234321,
          name: "门口光纤",
        },
        description: "入侵警报",
        previewUrl:
          "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
      },
      {
        id: 122546,
        time: 1699776612322, //unix时间戳
        fiber: {
          id: 234321,
          name: "门口光纤",
        },
        description: "入侵警报",
        previewUrl:
          "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
      },
      {
        id: 12218732,
        time: 1699776612322, //unix时间戳
        fiber: {
          id: 234321,
          name: "门口光纤",
        },
        description: "入侵警报",
        previewUrl:
          "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
      },
    ],
  },

  "GET /api/view/alarm/*": {
    success: true,
    msg: "xxxxxx错误",
    data: {
      id: 1221221,
      time: 1699776612322, //unix时间戳,毫秒
      fiber: {
        id: 234321,
        name: "门口光纤",
      },
      description: "入侵警报",
      previewUrl:
        "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
      snapshots: [
        {
          id: 123,
          camera: {
            id: 2132,
            name: "门口摄像头1",
          },
          picUrl:
            "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
        },
        {
          id: 127,
          camera: {
            id: 98762,
            name: "楼顶监控78",
          },
          picUrl:
            "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
        },
        {
          id: 223,
          camera: {
            id: 2132,
            name: "门口摄像头1",
          },
          picUrl:
            "https://www.hikvision.com/content/dam/hikvision/cn/Solutions/pbg/%E6%94%BF%E5%8A%A1%E6%B0%91%E7%94%9F/%E4%B8%89%E7%BA%A7%E7%9B%AE%E5%BD%95%E6%99%BA%E6%85%A7%E5%9F%8E%E7%AE%A1%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E5%85%A5%E5%8F%A3%E5%9B%BE.jpg",
        },
      ],
    },
  },
};
