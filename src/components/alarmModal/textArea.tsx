import { Input } from "antd";
import { forwardRef, useState } from "react";
import { useModel } from "umi";
export default forwardRef((prop, ref: any) => {
  const [value, setValue] = useState();
  const { PleaseDescribeBrieflyAndDealWithItImmediately } =
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
      placeholder={PleaseDescribeBrieflyAndDealWithItImmediately}
      style={{ height: 120, resize: "none" }}
      ref={ref}
    />
  );
});
