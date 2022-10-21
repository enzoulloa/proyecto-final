export default function UserNavBar({ page, image, name, userRole, selected }) {
  return (
    <div>
      <div className="userNavHeader">
        <img src={image} alt="UserProfileImg" className="userImg" />
        <p className="userNavHeaderTitle">Bienvenido, {`${name}`}</p>
      </div>
      <div className="userNavBody">
        <ul>
          <p>Info usuario</p>
          <p>Favs</p>
          <p>Cambiar contraseña</p>
          <p>Modificar Info</p>

          {userRole === 2 || userRole === 3 ? (
            <div className="seller">
              <p>Vendedor-lista de pendientes</p>
              <p>----Formularios de contacto</p>
              <p>----Señas hechas pendientes</p>
            </div>
          ) : null}
          {userRole === 3 ? (
            <div className="admin">
              <hr />
              <p>Admin-Listado de usuarios</p>
            </div>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
