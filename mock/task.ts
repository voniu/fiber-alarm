export default {
  "GET /api/admin/task": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: [
        {
          id: 1,
          hour: 23,
          minute: 59,
          fibers: [
            {
              id: 123,
              name: "Fiber 1",
            },
            {
              id: 234,
              name: "Fiber 2",
            },
          ],
          level: 7, // 待定
        },
        {
            id: 2,
            hour: 10,
            minute: 59,
            fibers: [
              {
                id: 123,
                name: "Fiber 1",
              },
              {
                id: 234,
                name: "Fiber 2",
              },
            ],
            level: 7, // 待定
          },
          {
            id: 3,
            hour: 2,
            minute: 10,
            fibers: [
              {
                id: 123,
                name: "Fiber 1",
              },
              {
                id: 234,
                name: "Fiber 2",
              },
            ],
            level: 7, // 待定
          },
      ],
    });
  },
};
