import React from "react";
import "./UserNav.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ExitSession, RefreshAuth0 } from "../../redux/actions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserNav({ img, name }) {
  const nameOne = name.split(" ");
  const { isAuthenticated, logout, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function alert() {
    Swal.fire("Sesion Cerrada", "Sesion cerrada correctamente", "success");
  }

 useEffect(()=>{
    dispatch(RefreshAuth0())
 },[isLoading])

  function handlerExitSession() {
    if (isAuthenticated) {
      logout();
      localStorage.removeItem("UserLogin");
    } else {
      dispatch(ExitSession());
      navigate("/ingresar");
    }
    alert();
  }

  return (
    <nav className="header__menu">
      <div className="profile">
        <figure className="profile__img">
          <Link to={`/usuario/${name}/informacion`}>
            <img src={img} alt="User" />
          </Link>
        </figure>
        <p>{nameOne[0]}</p>
      </div>
      <ul className="list">
        <li>
          <Link to={`/usuario/${name}/informacion`}>
            <button className="button-User">Usuario</button>
          </Link>
        </li>
        <li>
          <Link to="/favoritos">
            <button className="button-favorite">Favoritos</button>
          </Link>
        </li>
        <li className="list__item">
          <button onClick={() => handlerExitSession()} className="a">
            salir
          </button>
        </li>
      </ul>
    </nav>
  );
}
