export default {
  "GET /api/admin/task": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: [
        {
          id: 1,
          name: "Task 1",
          hour: 23,
          minute: 59,
          affectFiberIds: [
            {
              id: 123,
              name: "Fiber 1",
            },
            {
              id: 234,
              name: "Fiber 2",
            },
          ],
          configMap: {
            "0": {
              // A
              armed: true,
              vibeCount: 12, // 振动次数，1 - 100
              vibeAmplitude: 11, // 振动幅度，1 - 100
              vibeWidth: 22, // 振动宽度，1 - 100
              vibeGap: 33, // 振动间隙，1 - 100
            },
            "1": {
              armed: true,
              // B
              alarmSensitivity: 1, // 报警灵敏度， 1 - 10
              systemSensitivity: 2, // 系统灵敏度，1 - 10
              groupWidth: 1, // 组群宽度
              groupGap: 2, // 组群间距
              groupEntity: 4, // 实体数量
            },
          },
        },
        {
          id: 2,
          hour: 10,
          name: "Task 2",

          minute: 59,
          affectFiberIds: [
            {
              id: 123,
              name: "Fiber 1",
            },
            {
              id: 234,
              name: "Fiber 2",
            },
          ],
          configMap: {
            "0": {
              // A
              vibeCount: 12, // 振动次数，1 - 100
              vibeAmplitude: 11, // 振动幅度，1 - 100
              vibeWidth: 22, // 振动宽度，1 - 100
              vibeGap: 33, // 振动间隙，1 - 100
            },
            "1": {
              // B
              alarmSensitivity: 1, // 报警灵敏度， 1 - 10
              systemSensitivity: 2, // 系统灵敏度，1 - 10
              groupWidth: 1, // 组群宽度
              groupGap: 2, // 组群间距
              groupEntity: 4, // 实体数量
            },
          },
        },
        {
          id: 3,
          name: "Task 3",
          hour: 2,
          minute: 10,
          affectFiberIds: [
            {
              id: 123,
              name: "Fiber 1",
            },
            {
              id: 234,
              name: "Fiber 2",
            },
          ],
          configMap: {
            "0": {
              // A
              vibeCount: 12, // 振动次数，1 - 100
              vibeAmplitude: 11, // 振动幅度，1 - 100
              vibeWidth: 22, // 振动宽度，1 - 100
              vibeGap: 33, // 振动间隙，1 - 100
            },
            "1": {
              // B
              alarmSensitivity: 1, // 报警灵敏度， 1 - 10
              systemSensitivity: 2, // 系统灵敏度，1 - 10
              groupWidth: 1, // 组群宽度
              groupGap: 2, // 组群间距
              groupEntity: 4, // 实体数量
            },
          },
        },
      ],
    });
  },
  "GET /api/admin/task/1": (req, res) => {
    return res.json({
      success: true,
      message: "",
      data: {
        id: 1,
        name: "Task 1",
        hour: 23,
        minute: 59,
        affectFibers: [
          {
            id: 234321,
            name: "Fiber 1",
          },
          {
            id: 22228,
            name: "Fiber 2",
          },
        ],
        configMap: {
          "0": {
            // A
            vibeCount: 12, // 振动次数，1 - 100
            vibeAmplitude: 11, // 振动幅度，1 - 100
            vibeWidth: 22, // 振动宽度，1 - 100
            vibeGap: 33, // 振动间隙，1 - 100
          },
          "1": {
            // B
            alarmSensitivity: 1, // 报警灵敏度， 1 - 10
            systemSensitivity: 2, // 系统灵敏度，1 - 10
            groupWidth: 1, // 组群宽度
            groupGap: 2, // 组群间距
            groupEntity: 4, // 实体数量
          },
        },
      },
    });
  },
};
