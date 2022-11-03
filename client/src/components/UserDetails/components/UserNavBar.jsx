import { Link } from "react-router-dom";
import "./UserNavBar.scss";

export default function UserNavBar({ page, image, name, userRole, selected }) {
  return (
    <div className="containerNav">
      <div className="userNavHeader">
        <h2>Bienvenido al panel de usuario!</h2>
      </div>
      <div className="userNavBody">
        <Link to={`/usuario/${name}/informacion`} className="userNavLink">
          Informacion General
        </Link>
        <Link to={`/usuario/${name}/cambio_contraseña`} className="userNavLink">
          Cambiar Contraseña
        </Link>
        <Link to={`/usuario/${name}/propiedades`} className="userNavLink">
          Mis propiedades
        </Link>

        {userRole >= 2 ? (
          <div className="seller">
            <Link
              to={`/usuario/${name}/formularios_pendientes`}
              className="userNavLink"
            >
              Formularios pendientes
            </Link>
            {/* <Link to={`/usuario/${name}/lista_pagos`} className="userNavLink">
              Formularios señados
            </Link> */}
          </div>
        ) : null}
        {userRole === 3 && (
          <div className="admin">
            <Link to={`/usuario/${name}/moderacion`} className="userNavLink">
              Moderacion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
