import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import UserNavBar from "./components/UserNavBar";
import "./UserDetails.scss";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUserId } from "../../redux/actions";

export default function UserDetails() {
  const dispatch = useDispatch();
  const { isLoading, user } = useAuth0();
  const userInfo = useSelector((state) => state.userInfo);
  const user1 = JSON.parse(window.localStorage.getItem("UserLogin"));
  // const ownershipId = window.location.search.split('=')[1].split('&')[0];
  const idUser = window.location.search.split('=')[2] ? window.location.search.split('=')[2].split('&')[0] : null;
  // console.log(ownershipId);
  console.log(idUser);

  useEffect(() => {
    if(!user1) {
      dispatch(getUserId(idUser));
    };
  }, [dispatch, user1]);

  useEffect(() => {
    dispatch(getUserInfo(user1.name));
  }, [dispatch])

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="userDetails">
      <div className="userNavBar">
        <UserNavBar image={userInfo.photo} name={userInfo.name} userRole={3} />
      </div>
      <div className="userView">
        <Outlet />
      </div>
    </div>
  );
}
