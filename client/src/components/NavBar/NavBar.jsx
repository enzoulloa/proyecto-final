import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../scss/navbar.scss";
import { ExitSession } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginUserAuth0, LoginStatus } from "../../redux/actions";
import UserNav from "../UserNav/UserNav";
import img from '../../assets/LOGUITO-PF.svg'


export default function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const statusUser = useSelector((state)=>state.user);
  const {user, isAuthenticated, logout, isLoading} = useAuth0()
  
  
  useEffect(()=>{
    if(isAuthenticated){
      const userAuth0 = {
        email: user.email,
        name: user.nickname,
        photo: user.picture,
      }
      dispatch(LoginUserAuth0(userAuth0))
    }
    statusUser
  },[statusUser,isAuthenticated])

  const userLogin = JSON.parse(localStorage.getItem('UserLogin'))
  let location = useLocation();
  
  function alert(){
    Swal.fire('Sesion Cerrada','Sesion cerrada correctamente', 'success')
  }

  
  
  return (
    
    <div className="nav">
      <Link to="/">
        <img src={img}  className='img-loguito'/>
      </Link>
      <div className="linksContainer">
        <div className="loginContainer">
          {
            userLogin?
            <UserNav img={userLogin.photo} name={userLogin.name}/>:
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
      <div className="line-nav"></div>
    </div>
  );
}
