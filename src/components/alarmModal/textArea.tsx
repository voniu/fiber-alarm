import { Input } from "antd";
import { forwardRef, useState } from "react";
export default forwardRef((prop, ref: any) => {
  const [value, setValue] = useState();
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Input.TextArea
      showCount
      maxLength={100}
      value={value}
      onChange={onChange}
      placeholder="input processInfo"
      style={{ height: 120, resize: "none" }}
      ref={ref}
    />
  );
});
