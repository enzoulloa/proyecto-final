import { Link } from "react-router-dom";
import "../../scss/navbar.scss";

export default function NavBar() {
  return (
    <div className="nav">
      <p>Loguito</p>
      <div className="linksContainer">
        <Link to="/" className="link">
          Inicio
        </Link>
        <Link to="/about" className="link">
          Sobre Nosotros
        </Link>
        <Link to="/contacto" className="link">
          Contacto
        </Link>
        <div className="loginContainer">
          <Link to="/login" className="link">
            Ingresar
          </Link>
          <div className="button">
            <Link to="/register" className="link">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
