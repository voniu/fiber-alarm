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
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const onCancel = () => {
    setIsOpen(false);
  };
  const handleChange = (e: any) => {
    setList(e.target.value);
  };
  const fetchUser = async () => {
    setLoading2(true)
    const { data } = await getUser(0, "");
    setLoading2(false)
    setData(data);
  };
  const fetchGuard = async () => {
    setLoading1(true);
    const { data } = await getGuard();
    setLoading1(false)
    setData(data);
  };
  useEffect(() => {
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
            <UserList loading={loading2} flush={fetchUser} data={data || []} />
          )}
        </div>
        <div>
          {listType === "guard" && (
            <GuardList loading={loading1} flush={fetchGuard} data={data || []} />
          )}
        </div>
      </div>
      <AddModal isModalOpen={open} onCancel={onCancel} />
    </div>
  );
};

export default WithAuth(UserManage);
