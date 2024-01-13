export default {
  "POST /api/monitor/login": (req, res) => {
    console.log(req.body);

    return res.json({
      success: true,
      message: "",
      data: {
        id: 1,
        name: "mkbk",
      },
    });
  },
};
