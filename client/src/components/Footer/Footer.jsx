import React from "react";
import { Link } from "react-router-dom";
import "../../scss/Footer.scss";
import logo from "../../assets/LOGUITO-PF.svg"

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="title_cont">
          <img src={logo} className="title" />
          <p className="description">
            Somos una empresa encargada de administrar la venta y alquire de tus
            imuebles
          </p>
          <div className="redes_cont">
            <section className="redes_ul">
              <a href="https://www.instagram.com/">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733558.png?w=740&t=st=1665750312~exp=1665750912~hmac=c272d72ad1f11be9ebfa9fc6e3040b824caa0ae1705e1d55822f7cfa574796f6"
                  alt="instagram"
                />
              </a>
              <a href="https://www.facebook.com/">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/725/725289.png?w=740&t=st=1665750386~exp=1665750986~hmac=6c19d5875a8a872d51a6d297254883373daa9a5f7bf6fc3a7afc27ab78035b58"
                  alt="facebook"
                />
              </a>
              <a href="https://www.google.com.ar/maps/place/Avenida+Elvira+Rawson+de+Dellepiane/@-34.6222184,-58.3627827,17z/data=!3m1!4b1!4m5!3m4!1s0x95a334cff6af5fdd:0x2164a9b321ceb0f4!8m2!3d-34.6222228!4d-58.360594">
                <img
                  src="https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300"
                  alt="ubicacion"
                />
              </a>
              <a href="https://mail.google.com/mail/u/0/">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281786.png?w=740&t=st=1665750829~exp=1665751429~hmac=402e4f73787cd77ee8889e7152711468cebb3037f35c84fd8cea9f00a801c89a"
                  alt="gmail"
                />
              </a>
            </section>
          </div>
        </div>
        <div className="div_Alquilar">
          <h2>Alquilar</h2>
          <ul>
            <li>
              <Link to='/listings?ubication=buenos%aires'>Buenos Aires</Link>
            </li>
            <li>
              <Link to='/listings?ubication=la%plata'>La Plata</Link>
            </li>
            <li>
              <Link to='/listings?ubication=misiones'>Misiones</Link>
            </li>
            <li>
              <Link to='/listings?ubication=neuquen'>Neuquen</Link>
            </li>
          </ul>
        </div>
        <div className="div_Comprar">
          <h2>Comprar</h2>
          <ul>
            <li>
              <Link to='/listings?ubication=buenos%aires'>Buenos Aires</Link>
            </li>
            <li>
              <Link to='/listings?ubication=la%plata'>La Plata</Link>
            </li>
            <li>
              <Link to='/listings?ubication=misiones'>Misiones</Link>
            </li>
            <li>
              <Link to='/listings?ubication=neuquen'>Neuquen</Link>
            </li>
          </ul>
        </div>
        <div className="div_Help">
          <h2>Ayuda</h2>
          <ul>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
            <a href="mailto:soyhenrybienesraices@gmail.com?Subject=Consultas..">Mail</a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send/?phone=%2B542972527935&text&type=phone_number&app_absent=0">Celular</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copiRight-cont">
        <p className="Copyright">
          Copyright ©IpsumTech. 2022. All right reserved
        </p>
        <p className="disenadores">Design by: IpsumTech</p>
      </div>
    </div>
  );
}
