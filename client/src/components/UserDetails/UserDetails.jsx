import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetUsers } from "../../redux/actions";
import UserNavBar from "./components/UserNavBar";
import UserDashboard from "./components/UserDashboard";
import UserFavorites from "./components/UserFavorites";
import UserChangePassword from "./components/UserChangePassword";
import "./UserDetails.scss";
import UserModifyInfo from "./components/UserModifyInfo";
import { Outlet } from "react-router-dom";

export default function UserDetails() {
  const { user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const usuario = {
    cel: 1210101010101,
    role: 1,
    favourites: [
      {
        id: 1,
        name: "Propiedad1",
        location: "Buenos Aires",
        rooms: 5,
        garage: true,
        m2: "3",
        type: "PH",
        expenses: 20,
        seller: "Mario",
        description: "string",
        images: [
          "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695726.jpg",
        ],
        state: "for rent",
        price: 12345,
        floors: 1,
        review: ["text", "text"],
        address: "Las dalias 825",
      },
      {
        id: 2,
        name: "Propiedad2",
        location: "Buenos Aires",
        rooms: 3,
        garage: true,
        m2: "3",
        type: "PH",
        expenses: 20,
        seller: "Mario",
        description: "string",
        images: [
          "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695726.jpg",
        ],
        state: "for sell",
        price: 12345,
        floors: 1,
        review: ["text", "text"],
        address: "La pampa 6712",
      },
    ],
  };

  console.log(localStorage.getItem("UserLogin"));

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
          userRole={usuario.role}
        />
      </div>
      <div className="userView">
        {/* {page === "InfoGeneral" ? (
          <UserDashboard
            name={user.given_name}
            mail={user.email}
            cel={usuario.cel}
          />
        ) : null}
        {page === "Favs" ? (
          <UserFavorites favourites={usuario.favourites} />
        ) : null}
        {page === "ChangePw" ? (
          <UserChangePassword email={user.email} password={usuario.password} />
        ) : null}
        {page === "ModifyInfo" ? <UserModifyInfo /> : null} */}
        <Outlet />
      </div>
    </div>
  );
}
