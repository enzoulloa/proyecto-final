import React, { useEffect } from "react";
import { json, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalSign } from "../../redux/actions.js";
import "../../scss/Card.scss";
import BottonFavotire from "../ButtonFavorite/ButtonFavorite";
import ModalPortal from "../Modal/Modal";
import ModalUser from "../LoginModal/ModalUser";

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

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modalSign);
  const [stateModal, setStateModal] = useState(false);
  const verificationUser = JSON.parse(localStorage.getItem("UserLogin"));

  function handlerClose(e) {
    setStateModal(e);
  }

  useEffect(() => {
    if (!verificationUser) {
      dispatch(ModalSign(true));
    }
  }, [dispatch]);

  return (
    <div id="card-container">
      {verificationUser && <BottonFavotire id={id} />}
      {!verificationUser && (
        <button
          onClick={(e) => handlerClose(true)}
          className="btn-favorite-userNoLogin"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/4208/4208394.png" />
        </button>
      )}
      {stateModal && modal && (
        <ModalPortal onClose={(e) => handlerClose(false)}>
          <ModalUser />
        </ModalPortal>
      )}
      <Link to={`/propiedades/detalles/${id}/${name}/${price}`}>
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
