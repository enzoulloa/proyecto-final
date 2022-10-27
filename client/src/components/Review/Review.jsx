import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./review.scss";
import { postReview } from "../../redux/actions.js";
import { FaStar } from "react-icons/fa";
import { startTransition } from "react";


export default function Review({ id }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState({ message: "", stars: 0 });
  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  let userInfo = JSON.parse(window.localStorage.getItem("UserLogin"));
  const user = {
    id: 1,
    name: userInfo.name,
    photo: userInfo.photo,
  };
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
    e.preventDefault();
    /*review.userID = window.localStorage.getItem("UserLogin").id ? window.localStorage.getItem("UserLogin").id :*/
    dispatch(postReview({ review, user, ownerID }));
    setReview({ message: "", stars: "0" });
    setHoverValue(undefined);
  };

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  return (
    <div className="div-detail">
      <strong className="strong-review">Deja tu comentario!</strong>
      <div>
        <textarea
          name="message"
          className="textarea-review"
          onChange={handleChange}
          value={review.message}
          placeholder="Escribe..."
        ></textarea>
        <div>
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
              />
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={sendReview}>Enviar comentario</button>
      </div>
    </div>
  );
}