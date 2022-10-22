import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships } from "../../../redux/actions";
import { columnsOwnerships } from "../common";

export default function UserPendingList() {
  const dispatch = useDispatch();
  const ownerships = useSelector((state) => state.ownerships);

  useEffect(() => {
    dispatch(GetOwnerships());
  }, [dispatch]);
  return (
    <div>
      <Table dataSource={ownerships} columns={columnsOwnerships} size="large" />
    </div>
  );
}
