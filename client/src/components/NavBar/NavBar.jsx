import { Link } from "react-router-dom";
import "../../scss/navbar.scss";

export default function NavBar() {
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
          <Link className="link">Ingresar</Link>
          <div className="button">
            <Link className="link">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
