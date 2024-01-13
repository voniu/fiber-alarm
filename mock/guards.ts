const data = [
  {
    key: "1",
    id: 1,
    name: "John Brown",
    status: "on",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    id: 2,
    name: "Jim Green",
    status: "off",
    address: "London No. 1 Lake Park",
  },
  {
    id: 3,
    key: "3",
    name: "Joe Black",
    status: "off",
    address: "Sydney No. 1 Lake Park",
  },
];
export default {
  "GET /api/monitor/guards": (req, res) => {
    console.log(req.body);

    return res.json({
      success: true,
      message: "",
      data,
    });
  },
  "POST /api/monitor/onduty": (req, res) => {
    console.log(req.body);

    return res.json({
      success: true,
      message: "",
      data,
    });
  },
};
