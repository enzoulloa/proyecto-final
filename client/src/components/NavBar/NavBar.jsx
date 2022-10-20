import { Link, useLocation } from "react-router-dom";
import "../../scss/navbar.scss";
import { ExitSession } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function NavBar() {

  const dispatch = useDispatch()
  const statusUser = useSelector((state)=>state.user)
  
  useEffect(()=>{
    statusUser
  },[statusUser])

  const user = JSON.parse(localStorage.getItem('UserLogin'))
  let location = useLocation();
  
  function handlerExitSession(){
    dispatch(ExitSession())
  }
  
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
            user? 
            <div className="cont-user-nav">
              <Link to={`/user/${user.name}`}>
              <img src={user.photo} className='img_user'/>
              </Link>
              <button className='btn_logout' onClick={()=>handlerExitSession()}>salir</button>
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
