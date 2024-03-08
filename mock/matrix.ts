export default {
  "GET /api/common/matrix": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: [
        {
          row: 1,
          column: 1,
          cameraId: 2132,
        },
        {
          row: 1,
          column: 2,
          cameraId: 98762,
        },
        {
          row: 2,
          column: 1,
          cameraId: 98762,
        },
        {
          row: 2,
          column: 2,
          cameraId: 98762,
        },
      ],
    });
  },
};
