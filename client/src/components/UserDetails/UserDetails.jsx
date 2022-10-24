import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import UserNavBar from "./components/UserNavBar";
import "./UserDetails.scss";
import { Outlet } from "react-router-dom";

export default function UserDetails() {
  const { isLoading } = useAuth0();
  const user = JSON.parse(window.localStorage.getItem("UserLogin"));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="userDetails">
      <div className="userNavBar">
        <UserNavBar image={user.photo} name={user.name} userRole={3} />
      </div>
      <div className="userView">
        <Outlet />
      </div>
    </div>
  );
}
