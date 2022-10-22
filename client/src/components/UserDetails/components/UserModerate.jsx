import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../../../redux/actions";
import { columnsUsers } from "../common";

export default function UserModerate() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  function applyModeration(e) {
    //dispatch(moderate(ban))
    //dispatch(moderate(admin))

    console.log("asd");
  }
  return (
    <div>
      <Table dataSource={users} columns={columnsUsers} />
    </div>
  );
}
