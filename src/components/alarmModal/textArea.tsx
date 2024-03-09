import { Input } from "antd";
import { forwardRef } from "react";
import { useModel } from "umi";
export default forwardRef(
  (prop: { value: string; setValue: (val: string) => void }, ref: any) => {
    const { value, setValue } = prop;
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
  }
);
