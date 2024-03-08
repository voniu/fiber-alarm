import { Badge } from "antd";

export default function ({
  online,
  color,
}: {
  online: boolean;
  color: string;
}) {
  return (
    <>
      <Badge
        style={{ color }}
        status={online ? "success" : "error"}
        text={online ? "online" : "offline"}
      />
    </>
  );
}
