import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetUsers } from "../../redux/actions";
import UserNavBar from "./components/UserNavBar";
import "./UserDetails.scss";
import { Outlet } from "react-router-dom";

export default function UserDetails() {
  const { user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const [page, setPage] = useState("");

  useEffect(() => {
    dispatch(GetUsers());
    setPage("ModifyInfo");
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="userDetails">
      <div className="userNavBar">
        <UserNavBar
          image={user.picture}
          name={user.given_name}
          selected={page}
          userRole={3}
        />
      </div>
      <div className="userView">
        <Outlet />
      </div>
    </div>
  );
}
