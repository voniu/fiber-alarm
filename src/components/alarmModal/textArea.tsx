import { Input } from "antd";
import { forwardRef, useState } from "react";
import { useModel } from "umi";
export default forwardRef((prop, ref: any) => {
  const [value, setValue] = useState();
  const { PleaseDescribeBrieflyAndDealWithItImmediately, Optional } =
    useModel("useLocaleText");
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Input.TextArea
      showCount
      maxLength={100}
      value={value}
      onChange={onChange}
      placeholder={
        PleaseDescribeBrieflyAndDealWithItImmediately + `(${Optional})`
      }
      style={{ height: 80, resize: "none", marginTop: 5 }}
      ref={ref}
    />
  );
});
