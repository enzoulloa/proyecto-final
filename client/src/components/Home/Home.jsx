import React, { useEffect } from "react";
import "../../scss/home.scss";
import FiltersHome from "../FiltersHome";
import Footer from "../Footer/Footer";
import HomeCards from "../HomeCards";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOwnerships(`published=Publicada`));
  }, []);

  const { isLoading, user } = useAuth0();
  //userStatus = 'suspendido' -> mostrar mensaje aca o en ingresar.
  return (
    <div className="home">
      <div className="containerI">
        <FiltersHome />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <HomeCards />
        </div>
      )}
    </div>
  );
}
