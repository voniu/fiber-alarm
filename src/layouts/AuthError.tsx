import { Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAccess, useLocation, useModel } from "umi";

export default function (props: { children?: any }) {
  const [shouldRender, setShRender] = useState(false);
  const access = useAccess();
  const location = useLocation();
  const { loading } = useModel("useAdminInfo");
  const getAccess = () => {
    //@ts-ignore
    const val = access[location.pathname.split("/")[2]];
    return val === undefined ? true : val;
  };
  useEffect(() => {
    if (!loading) {
      setShRender(true);
    }
  }, [loading]);
  return (
    <>
      {shouldRender ? (
        getAccess() ? (
          props.children
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
          />
        )
      ) : (
        <Spin
          size="large"
          style={{
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </>
  );
}
