import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./review.scss";
import { postReview } from "../../redux/actions.js";
import { FaStar } from "react-icons/fa";
import { startTransition } from "react";
import ModalPortal from "../Modal/Modal";
import ModalUser from "../LoginModal/ModalUser";

export default function Review({ id }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState({ message: "", stars: 0 });
  const [showModal, setShowModal] = useState(false)
  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  let userInfo = JSON.parse(window.localStorage.getItem("UserLogin"));
  const user = userInfo
    ? {
        id: userInfo.id,
        name: userInfo.name,
        photo: userInfo.photo,
      }
    : null;
  const ownerID = id;

  const handleClick = (value) => {
    setReview({ ...review, stars: value.toString() });
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const sendReview = (e) => {
    if (!userInfo) return setShowModal(true)
    e.preventDefault();
    dispatch(postReview({ review, user, ownerID }));
    setReview({ message: "", stars: "0" });
    setHoverValue(undefined);
  };

  const handleClose = () => {
    setShowModal(false)
  }

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  return (
    <div className="div-detail extra-review">
      <h2 className="strong-review">Deja tu comentario!</h2>
      <div className="div-review">
        <textarea
          name="message"
          className="textarea-review"
          onChange={handleChange}
          value={review.message}
          placeholder="Escribe..."
        ></textarea>
        <div className="stars">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                color={
                  (hoverValue || parseInt(review.stars)) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                className="star"
              />
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={sendReview}>Enviar comentario</button>
        {showModal && <ModalPortal onClose={()=>handleClose()}><ModalUser/></ModalPortal>}

      </div>
    </div>
  );
}
