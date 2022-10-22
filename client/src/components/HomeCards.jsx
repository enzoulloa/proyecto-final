import React from "react";
import { Link } from "react-router-dom";
import "../scss/homecards.scss";
import sell from "../assets/sellHome.jpg";
import buy from "../assets/buyHome.jpg";
import rent from "../assets/rentHome.jpg";

export default function HomeCards() {

  return (
    <section>
      <div className="containerE">
        <ul>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src={buy} alt="Compra una casa" />
              </div>
              <div className="homecards-text">
                <h4>Comprar una casa</h4>
                <p>
                  Encuentra tu lugar con una experiencia fotográfica inmersiva y
                  la mayoría de los listados, incluidas cosas que no encontrarás
                  en ningún otro lugar.
                </p>
                <Link to="/listings">Buscar casas</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src={rent} alt="Alquila una casa" />
              </div>
              <div className="homecards-text">
                <h4>Alquilar una casa</h4>
                <p>
                  Estamos creando una experiencia en línea perfecta, desde
                  comprar en la red de alquiler más grande hasta solicitar y
                  pagar el alquiler.
                </p>
                <Link to="listings">Encontrar alquileres</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src={sell} alt="Vende una casa" />
              </div>
              <div className="homecards-text">
                <h4>Vender una casa</h4>
                <p>
                  No importa qué camino tome para vender su casa, podemos
                  ayudarlo a lograr una venta exitosa.
                </p>
                <Link to='/sell'>Mire sus opciones</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
