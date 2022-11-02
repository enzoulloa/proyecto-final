import { Link } from "react-router-dom";

export default function UserNavBar({ page, image, name, userRole, selected }) {
  return (
    <div>
      <div className="userNavHeader">
        <img src={image} alt="UserProfileImg" className="userImg" />
        <p className="userNavHeaderTitle">Bienvenido, {`${name}`}</p>
      </div>
      <div className="userNavBody">
        <Link to={`/usuario/${name}/info`} className="userNavLink">
          Informacion General
        </Link>
        <Link to={`/usuario/${name}/cambio_contraseña`} className="userNavLink">
          Cambiar Contraseña
        </Link>
        <Link to={`/usuario/${name}/modificar_info`} className="userNavLink">
          Modificar Info
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
