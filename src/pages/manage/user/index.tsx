import { getGuard, getUser } from "@/services/admin";
import WithAuth from "@/wrappers/authAdmin";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { Button, Radio, Checkbox } from "antd";
import { User } from "@/type";
import UserList from "./list/userList";
import GuardList from "./list/guardList";
import AddModal from "./addModal";
import { useModel } from "umi";

const UserManage = () => {
  const [data, setData] = useState<User[]>();
  const [open, setIsOpen] = useState(false);
  const [listType, setList] = useState("user");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isArchived, setArchived] = useState(false);
  const { Guarder, SuspendedUser, Add, UserManage, User } =
    useModel("useLocaleText");
  const onCancel = () => {
    setIsOpen(false);
  };
  const handleChange = (e: any) => {
    setList(e.target.value);
  };
  const fetchUser = async () => {
    setLoading2(true);
    const { data } = await getUser(-1, "", isArchived);
    setLoading2(false);
    setData(data);
  };
  const fetchGuard = async () => {
    setLoading1(true);
    const { data } = await getGuard(isArchived);
    setLoading1(false);
    setData(data);
  };
  const flush = () => {
    if (listType === "user") {
      fetchUser();
    } else {
      fetchGuard();
    }
  };
  useEffect(() => {
    console.log("flush");
    flush();
  }, [listType, isArchived]);
  const handleArchive = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
    setArchived(e.target.checked);
  };
  return (
    <div>
      <p style={{ fontSize: 20, fontWeight: "bold", height: 20 }}>
        {UserManage}
      </p>
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <Radio.Group value={listType} onChange={handleChange} size="middle">
            <Radio.Button value="user">{User}</Radio.Button>
            <Radio.Button value="guard">{Guarder}</Radio.Button>
          </Radio.Group>
          <div className={styles["operator"]}>
            <div>
              <Checkbox style={{ fontWeight: "bold" }} onChange={handleArchive}>
                {SuspendedUser}
              </Checkbox>
            </div>
            <div>
              <Button type="primary" onClick={() => setIsOpen(true)}>
                {Add}
              </Button>
            </div>
          </div>
        </div>
        <div>
          {listType === "user" && (
            <UserList
              isArchived={isArchived}
              loading={loading2}
              flush={fetchUser}
              data={data || []}
            />
          )}
        </div>
        <div>
          {listType === "guard" && (
            <GuardList
              isArchived={isArchived}
              loading={loading1}
              flush={fetchGuard}
              data={data || []}
            />
          )}
        </div>
      </div>
      <AddModal
        flush={flush}
        type={listType}
        isModalOpen={open}
        onCancel={onCancel}
      />
    </div>
  );
};

export default WithAuth(UserManage);
