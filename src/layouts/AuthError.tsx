import { Result } from "antd";
import { useAccess, useLocation } from "umi";

export default function (props: { children?: any }) {
  const access = useAccess();
  const location = useLocation();

  const getAccess = () => {
    //@ts-ignore
    const val = access[location.pathname.split("/")[2]];
    return val === undefined ? true : val;
  };

  return (
    <>
      {getAccess() ? (
        props.children
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
        />
      )}
    </>
  );
}
