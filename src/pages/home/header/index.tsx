import { useState } from "react";
import { AuthModal } from "../authModal";
import styles from "./index.less";
import { Button, Select } from "antd";

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectVal, setSelect] = useState<string | null>(
    JSON.parse(localStorage.getItem("guard")!).name
  );
  const [newVal, setNewSelect] = useState<string | null>(null);

  const onChange = (val: string) => {
    setNewSelect(val);
    setModalOpen(true);
    console.log(val);
  };
  const onSearch = (val: string) => {
    console.log(val);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className={styles["header"]}>
      <div className={styles["select"]}>
        <span className={styles["select-span"]} style={{ color: "#fff" }}>
          Person:
        </span>
        <Select
          value={selectVal}
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <Button style={{ marginLeft: 20 }}>EXIT</Button>
      </div>
      <AuthModal
        isModalOpen={isModalOpen}
        setModal={(val: boolean) => setModalOpen(val)}
        onCancel={() => setModalOpen(false)}
        selectVal={selectVal}
        newVal={newVal}
        setSelect={(val: string) => setSelect(val)}
      />
    </div>
  );
};
