export default {
  "POST /api/guard/login": (req, res) => {
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
  "GET /api/guard/loginState": (req, res) => {
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
  "GET /api/guard/onduty": (req, res) => {
    console.log(req.body);
    return res.json({
      success: true,
      message: "",
      data: {
        isAnyoneOnDuty: true, // 是否有主管处于值班状态，true 才有下面
        isSelfOnDuty: true, // 当前登录的主管是否处于值班状态
        manager: {
          id: 1,
          name: "Manager 1",
        },
        guard: {
          // 当前值班的保安
          id: 1,
          name: "Guard 1",
        },
      },
    });
  },
};
