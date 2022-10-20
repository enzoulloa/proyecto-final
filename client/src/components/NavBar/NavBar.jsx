import { Link, useLocation } from "react-router-dom";
import "../../scss/navbar.scss";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {

  const {loginWithRedirect, user, isAuthenticated,logout} = useAuth0()
  let location = useLocation();
  if(location.pathname === '/signin'){
    console.log(true)
  }

  console.log(user)
  return (
    <div className="nav">
      <Link to="/">
        <p>Loguito</p>
      </Link>
      <div className="linksContainer">
        <Link to="/about" className="link">
          Sobre Nosotros
        </Link>
        <div className="loginContainer">
          {
            isAuthenticated? 
            <div className="cont-user-nav">
              <Link to={`/user/${user.nickname}`}>
              <img src={user.picture} className='img_user'/>
              </Link>
              <button onClick={()=>logout()} className='btn_logout'>salir</button>
            </div>:
            location.pathname !== '/signin' && location.pathname !== '/signup' &&
            (
              <div className="div_register_cont">
                <Link to='/signin' className="link">Ingresar</Link>
                <div className="button">
                  <Link to='/signup' className="link">Registrarse</Link>
                </div>
              </div>
              
            )
          }
        </div>
      </div>
    </div>
  );
}
