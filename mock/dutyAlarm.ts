export default {
  "GET /api/guard/alarm/1": (req, res) => {
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
        description: "入侵警报",
        previewUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
        snapshots: [
          {
            id: 123,
            camera: {
              id: 456,
              name: "camera1",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 123,
            camera: {
              id: 456,
              name: "camera2",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 123,
            camera: {
              id: 456,
              name: "camera3",
            },
            picUrl: "https://s2.loli.net/2024/01/27/QptsZvwNoeqfr4O.png",
          },
          {
            id: 123,
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
