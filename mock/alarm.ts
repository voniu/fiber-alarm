export default {
  "GET /api/admin/alarm": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: [
        {
          id: 1,
          time: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          description: "入侵警报",
          previewUrl: "/snapshot/1.jpg",
          status: 2,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "保安1",
            log: "处理日志",
          },
          manager: {
            // status 大于 1 的才有这项
            id: 123,
            name: "主管1",
            log: "处理日志",
          },
        },
        {
          id: 2,
          time: 1699775795444,
          fiber: {
            id: 456,
            name: "asdads",
          },
          description: "入侵警报",
          previewUrl: "/snapshot/1.jpg",
          status: 1,
          guard: {
            // status 大于 0 的才有这项
            id: 123,
            name: "保安1",
            log: "处理日志",
          },
        },
      ],
    });
  },
};
