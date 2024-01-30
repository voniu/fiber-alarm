import { getGuard, getUser } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Radio } from "antd";
import { User } from "@/type";
import UserList from "./list/userList";
import GuardList from "./list/guardList";
import AddModal from "./addModal";

const UserManage = () => {
  const [data, setData] = useState<User[]>();
  const [open, setIsOpen] = useState(false);
  const [listType, setList] = useState("user");
  const onCancel = () => {
    setIsOpen(false);
  };
  const handleChange = (e: any) => {
    setList(e.target.value);
  };
  const fetchUser = async () => {
    const { data: superAdmin } = await getUser(0, "");
    const { data: admin } = await getUser(1, "");
    const { data: manager } = await getUser(2, "");
    setData([...superAdmin, ...admin, ...manager]);
  };
  const fetchGuard = async () => {
    const { data } = await getGuard();
    setData(data);
  };
  useEffect(() => {
    console.log("dsadas");

    if (listType === "user") {
      fetchUser();
    } else {
      fetchGuard();
    }
  }, [listType]);

  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        User Manage
      </p>
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <Radio.Group value={listType} onChange={handleChange} size="middle">
            <Radio.Button value="user">user</Radio.Button>
            <Radio.Button value="guard">guard</Radio.Button>
          </Radio.Group>
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              Add
            </Button>
          </div>
        </div>
        <div>
          {listType === "user" && (
            <UserList flush={fetchUser} data={data || []} />
          )}
        </div>
        <div>
          {listType === "guard" && (
            <GuardList flush={fetchGuard} data={data || []} />
          )}
        </div>
      </div>
      <AddModal isModalOpen={open} onCancel={onCancel} />
    </div>
  );
};

export default WithAuth(UserManage);
