import React from "react";
import { Link } from "react-router-dom";
import "../../scss/Card.scss";

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
  return (
    <div id="card-container">
      <Link to={`/ownerships/detail/${id}`}>
        <img className="img-card" src={images} />
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
      </Link>
    </div>
  );
}
