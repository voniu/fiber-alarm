import { Input } from "antd";
import { forwardRef, useState } from "react";
import { useModel } from "umi";
import styles from "./index.less";
interface IProps {
  status: number;
  info: string;
  isHistory: boolean;
}
export default forwardRef((props: IProps, ref: any) => {
  const [value, setValue] = useState();
  const { status, info, isHistory } = props;
  const { InputProcessInfo } = useModel("useLocaleText");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return status === 1 && !isHistory ? (
    <Input.TextArea
      showCount
      maxLength={100}
      value={value}
      onChange={onChange}
      placeholder={InputProcessInfo}
      style={{ height: 120, resize: "none" }}
      ref={ref}
    />
  ) : (
    <div className={styles["info-content"]}>{info || ""}</div>
  );
});
