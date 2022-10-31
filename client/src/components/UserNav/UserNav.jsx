import React from "react";
import './UserNav.scss';
import { Link , useNavigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ExitSession } from "../../redux/actions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";


export default function UserNav({img, name}){


    const nameOne = name.split(' ')
    const { isAuthenticated, logout } = useAuth0();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function alert(){
        Swal.fire('Sesion Cerrada','Sesion cerrada correctamente', 'success')
      }

    function handlerExitSession(){
        if(isAuthenticated){
          logout()
          localStorage.removeItem('UserLogin');
        }else{
          dispatch(ExitSession())
          navigate('/signin')
        }
        alert()
      }

    return(
        <nav className="header__menu">
      <div className="profile">
        <figure className="profile__img">
            <Link to={`/user/${name}`}>
                <img src={img} alt="User"/>
            </Link>
        </figure>
        <p>{nameOne[0]}</p>
      </div>
      <ul className="list">
        <li className="list__item"><button onClick={()=>handlerExitSession()} className='a'>salir</button></li>
        <li><Link to='/favorite'><button className='button-favorite'>Favoritos</button></Link></li>
        <li><Link to={`/user/${name}`}><button className='button-User'>Usuario</button></Link></li>
      </ul>
    </nav>
    )
}