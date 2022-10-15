import React from "react";
import "../../scss/Card.scss";

export default function Card({ images, name, location, price, rooms, type }) {
  return (
    <div id="card-container">
      <img className="img-card" src={images} />
      <h2>{name}</h2>
      <p className="description-card">{location}</p>
      <div className="ico-card">
        <img src="https://cdn-icons-png.flaticon.com/512/2286/2286105.png" />
        <p className="text-ico">{rooms} Habitaciones</p>
        <img src="https://cdn-icons-png.flaticon.com/512/618/618911.png" />
        <p className="text-ico">{type}</p>
        <img src="https://cdn-icons-png.flaticon.com/512/353/353760.png" />
        <p className="text-ico">{price}</p>
      </div>
    </div>
  );
}
