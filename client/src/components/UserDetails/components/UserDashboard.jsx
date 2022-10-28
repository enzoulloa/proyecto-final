import { useSelector } from "react-redux";

export default function UserDashboard({ userInfo }) {
  const user = useSelector((state) => state.userInfo);

  return (
    <div className="Dashboard">
      <p>Name: {`${user.name}`}</p>
      <p>Email: {`${user.email}`}</p>
      <p>Cel: {`${user.cel}`}</p>
    </div>
  );
}
