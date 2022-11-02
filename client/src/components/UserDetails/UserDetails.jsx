import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import UserNavBar from "./components/UserNavBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUserId } from "../../redux/actions";
import "./UserDetails.scss";

export default function UserDetails() {
  const dispatch = useDispatch();
  const { isLoading } = useAuth0();
  const userInfo = useSelector((state) => state.userInfo);
  const user1 = JSON.parse(window.localStorage.getItem("UserLogin"));
  const idUser = window.location.search.split("=")[2]
    ? window.location.search.split("=")[2].split("&")[0]
    : null;
  console.log(idUser);
  useEffect(() => {
    if (!user1) {
      dispatch(getUserId(idUser));
    }
  }, [dispatch, user1]);

  useEffect(() => {
    if (user1) {
      dispatch(getUserInfo(user1.name));
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="userDetails">
      <div className="userNavBar">
        <UserNavBar
          image={userInfo.photo}
          name={userInfo.name}
          userRole={userInfo.role}
        />
      </div>
      <div className="userView">
        {user1 ? <Outlet /> : <Navigate to="/ingresar" />}
      </div>
    </div>
  );
}
