import React from "react";
import { useDispatch } from "react-redux";
import error from "../assets/error.svg";
import "../scss/error.scss";

export default function Error() {
  const dispatch = useDispatch;
  return (
    <div className="error">
      <img src={error} alt="error" />
      <h2>No se encontraron resultados</h2>
    </div>
  );
}
