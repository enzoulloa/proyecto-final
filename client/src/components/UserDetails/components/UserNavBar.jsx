import { Link } from "react-router-dom";

export default function UserNavBar({ page, image, name, userRole, selected }) {
  return (
    <div>
      <div className="userNavHeader">
        <img src={image} alt="UserProfileImg" className="userImg" />
        <p className="userNavHeaderTitle">Bienvenido, {`${name}`}</p>
      </div>
      <div className="userNavBody">
        <Link to={`/user/${name}/info`} className="userNavLink">
          Informacion General
        </Link>
        <Link to={`/user/${name}/cambio_contraseña`} className="userNavLink">
          Cambiar Contraseña
        </Link>
        <Link to={`/user/${name}/modificar_info`} className="userNavLink">
          Modificar Info
        </Link>
        <Link to={`/user/${name}/propiedades`} className='userNavLink'>
          Mis propiedades
        </Link>

        {userRole >= 2 ? (
          <div className="seller">
            <Link
              to={`/user/${name}/formularios_pendientes`}
              className="userNavLink"
            >
              Formularios pendientes
            </Link>
            <Link to={`/user/${name}/lista_pagos`} className="userNavLink">
              Formularios señados
            </Link>
          </div>
        ) : null}
        {userRole === 3 && (
          <div className="admin">
            <hr />
            <Link to={`/user/${name}/moderacion`} className="userNavLink">
              Moderacion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
