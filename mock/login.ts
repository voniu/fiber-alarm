export default {
  "POST /api/admin/login": (req, res) => {
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
  "GET /api/admin/loginState": (req, res) => {
    console.log(req.body);

    return res.json({
      success: true,
      message: "",
      data: {
        isLogined: true,
        user: {
          // 只在 isLogined = true 时存在
          id: 1,
          name: "user name",
          type: 2,
        },
        isOnDuty: true, // 当前登录态是否处于值班状态
        guard: {
          // 当前值班的保安
          id: 1,
          name: "Guard 1",
        },
      },
    });
  },
};
