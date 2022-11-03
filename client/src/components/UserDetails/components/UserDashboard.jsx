import { useSelector } from "react-redux";
import "./UserDashboard.scss"
import UserModifyInfo from "./UserModifyInfo.jsx";

export default function UserDashboard({ userInfo }) {
  const user = useSelector((state) => state.userInfo);

  return (
    <div className="divTotal">
    <div className="divInfoTotal">
      <img src={user.photo} alt="UserProfileImg" className="userImg" />
      <div className="divInfo">
        <div>
          <h2 className="text-sub">Nombre:</h2>
          <h2>{`${user.name}`}</h2>
        </div>
        <div>
          <h2 className="text-sub">Email:</h2>
          <h2>{`${user.email}`}</h2>
        </div>
        <div>
          <h2 className="text-sub">Cel:</h2>
          <h2>{`${user.cel}`}</h2>
        </div>
      </div>
      </div>
      <UserModifyInfo />
      </div>
  );
}
