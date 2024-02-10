export default {
  "GET /api/admin/alarm": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: [
        {
          id: 1,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 0,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 2,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 1,
          previewUrl: "/snapshot/1.jpg",
          status: 1,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "immadmkel",
          },
        },
        {
          id: 3,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 2,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 4,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 3,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 5,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 0,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 6,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 0,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 7,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 0,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 8,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          type: 0,
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
        {
          id: 9,
          createTime: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          description: "alarm type 1",
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "guard1",
            log: "info 1",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "manager1",
            log: "info 2",
          },
        },
      ],
    });
  },
  "GET /api/admin/alarm/1": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: {
        id: 1,
        createTime: 1699775795444,
        fiber: {
          id: 234321,
          name: "fiber test1",
        },
        guard: {
          // status 大于 0 的才有这项
          id: 123,
          name: "guard1",
          log: "info 1",
        },
        type: 0,
        status: 1,
        previewUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
        snapshots: [
          {
            id: 1,
            camera: {
              id: 456,
              name: "camera1",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 2,
            camera: {
              id: 456,
              name: "camera2",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 3,
            camera: {
              id: 456,
              name: "camera3",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 4,
            camera: {
              id: 456,
              name: "camera4",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
        ],
      },
    });
  },
};
