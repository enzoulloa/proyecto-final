import { Link, useLocation } from "react-router-dom";
import "../../scss/navbar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie'


export default function NavBar() {

  const user = useSelector((state)=>state.user)
  let location = useLocation();
  
  if(user.name){
    localStorage.setItem('UserLogin', JSON.stringify(user))
  }

  const userLogin= JSON.parse( localStorage.getItem('UserLogin'));
  console.log(userLogin.name)
  

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
            user.name? 
            <div className="cont-user-nav">
              <Link to={`/user/${user.name}`}>
              <img src={user.photo} className='img_user'/>
              </Link>
              <button className='btn_logout'>salir</button>
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
