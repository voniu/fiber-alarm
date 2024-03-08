export default {
  "GET /api/admin/user": (req, res) => {
    console.log(req.body, "LLLLLLL");
    if (req.query.type == 0)
      return res.json({
        success: true,
        message: "",
        data: [
          {
            id: 1,
            name: "jack",
            nickname: "jjjj jjj",
            type: 0,
          },
          {
            id: 2,
            name: "miku",
            nickname: "mik liu",
            type: 1,
          },
          {
            id: 3,
            name: "twist",
            nickname: "tw mo",
            type: 2,
          },
          {
            id: 4,
            name: "olfmaster",
            nickname: "olpki lois",
            type: 2,
          },
          {
            id: 5,
            name: "m1agic",
            nickname: "majix kl",
            type: 2,
          },
          {
            id: 6,
            name: "simple",
            nickname: "simml mloi",
            type: 2,
          },
        ],
      });
    else if (req.query.type == 1)
      return res.json({
        success: true,
        message: "",
        data: [
          {
            id: 7,
            name: "jack",
            nickname: "simml mloi",
            type: 0,
          },
        ],
      });
    else if (req.query.type == 2)
      return res.json({
        success: true,
        message: "",
        data: [
          {
            id: 8,
            name: "jack",
            nickname: "simml mloi",
            type: 0,
          },
        ],
      });
    else {
      return res.json({
        success: true,
        message: "",
        data: [
          {
            id: 9,
            name: "jack",
            nickname: "simml mloi",
            type: 0,
          },
        ],
      });
    }
  },
  "GET /api/admin/guard": {
    success: true,
    message: "",
    data: [
      {
        id: 1,
        nickname: "mik liu",
        name: "jack Guard",
      },
      {
        id: 2,
        nickname: "mik liu",
        name: "miku Guard",
      },
      {
        id: 3,
        nickname: "mik liu",
        name: "twist Guard",
      },
      {
        id: 4,
        nickname: "mik liu",
        name: "olfmaster Guard",
      },
      {
        id: 5,
        nickname: "mik liu",
        name: "m1agic Guard",
      },
      {
        id: 6,
        nickname: "mik liu",
        name: "simple Guard",
      },
      {
        id: 7,
        nickname: "mik liu",
        name: "simple Guard1",
      },
      {
        id: 8,
        nickname: "mik liu",
        name: "simple Guard2",
      },
      {
        id: 9,
        nickname: "mik liu",
        name: "simple Guard3",
      },
      {
        id: 10,
        nickname: "mik liu",
        name: "simple Guard4",
      },
      {
        id: 11,
        nickname: "mik liu",
        name: "simple Guard5",
      },
    ],
  },
};
