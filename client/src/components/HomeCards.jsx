import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../scss/homecards.scss";
import { useDispatch } from "react-redux";
import { filterCards } from "../redux/actions";

export default function HomeCards() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleBuy(e){
    e.preventDefault()
    dispatch(filterCards("state=Venta"))
    navigate("/listado")
  }

   function handleRent(e){
    e.preventDefault()
    dispatch(filterCards("state=Alquiler"))
    navigate("/listado")
  }


  return (
    <section className="section-container-homecards">
      <div className="containerE">
        <ul>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src="https://i.pinimg.com/564x/af/6d/c4/af6dc4e916c7d784768b57b242145255.jpg" alt="Compra una casa" />
              </div>
              <div className="homecards-text">
                <h4>Comprar una casa</h4>
                <p>
                  Encuentra tu lugar con una experiencia fotográfica inmersiva y
                  la mayoría de los listados, incluidas cosas que no encontrarás
                  en ningún otro lugar.
                </p>
                <Link to="/listado" onClick={e=>handleBuy(e)}>Buscar casas</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src="https://i.pinimg.com/564x/bf/4b/57/bf4b57cf3645de1e2a97421b48a22561.jpg" alt="Alquila una casa" />
              </div>
              <div className="homecards-text">
                <h4>Alquilar una casa</h4>
                <p>
                  Estamos creando una experiencia en línea perfecta, desde
                  comprar en la red de alquiler más grande hasta solicitar y
                  pagar el alquiler.
                </p>
                {/* <button onClick={e=>handleBuy(e)}>Encontrar alquileres</button> */}
                <Link to="/listado" onClick={e=>handleRent(e)}>Encontrar alquileres</Link>
              </div>
            </div>
          </li>
          <li>
            <div className="homecards">
              <div className="homecards-image">
                <img src="https://i.pinimg.com/564x/92/ec/b3/92ecb380299b4d6a86f8d39a9fcc1dce.jpg" alt="Vende una casa" />
              </div>
              <div className="homecards-text">
                <h4 className="h4-vender">Vender una casa</h4>
                <p>
                  No importa qué camino tome para vender su casa, podemos
                  ayudarlo a lograr una venta exitosa.
                  Es tan facil como completar nuestro fomulario.
                </p>
                <Link to="/vender">Mire sus opciones</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
