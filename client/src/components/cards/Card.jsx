import React from "react";
import { json, Link } from "react-router-dom";
import "../../scss/Card.scss";
import BottonFavotire from "../ButtonFavorite/ButtonFavorite";

export default function Card({
  images,
  name,
  location,
  price,
  rooms,
  type,
  id,
}) {
  if (
    images ===
    "https://www.pngplay.com/wp-content/uploads/2/Trollface-No-Background.png"
  ) {
    images =
      "https://dchba.org/wp-content/uploads/2020/06/house-placeholder.png";
  }

  const verificationUser = JSON.parse(localStorage.getItem('UserLogin'))
  return (
    <div id="card-container">
        {
          verificationUser && verificationUser.role === 1 && <BottonFavotire/>
        }
        {
          !verificationUser && <Link to='/signin'><button>+</button></Link>
        }
        <Link to={`/ownerships/detail/${id}/${name}/${price}`}>

        <img className="img-card" src={images} />
        </Link>
        <h2>{name}</h2>
        <p className="description-card">{location}</p>
        <div className="ico-card">
          <img src="https://cdn-icons-png.flaticon.com/512/2286/2286105.png" />
          <p className="text-ico">{rooms} Habitaciones</p>
          <img src="https://cdn-icons-png.flaticon.com/512/618/618911.png" />
          <p className="text-ico">{type}</p>
          <img src="https://cdn-icons-png.flaticon.com/512/353/353760.png" />
          <p className="text-ico">${price}</p>
        </div>
      
    </div>
  );
}
