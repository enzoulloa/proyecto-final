import React from "react";
import "../scss/loading.scss";
import gif3 from "../assets/loading3.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img src={gif3} alt="Loading" />
      <div className="loading-label">Cargando...</div>
    </div>
  );
}
