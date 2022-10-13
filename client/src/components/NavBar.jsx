import { Link } from "react-router-dom";
import "./navbar.scss";

export default function NavBar() {
  return (
    <div className="nav">
      <p>Loguito</p>
      <div className="linksContainer">
        <Link to="/home" className="link">
          Inicio
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/contacto" className="link">
          Contacto
        </Link>
        <div className="loginContainer">
          <Link to="/login" className="link">
            Log In
          </Link>
          <div className="button">
            <Link to="/register" className="link">
              Sing Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
