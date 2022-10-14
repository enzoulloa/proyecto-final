import React from "react";
import "../scss/filters.scss"
import search from "../assets/search.svg"

export default function FiltersHome(){
  return(
    <div className="filters">
      <div className="filters-input">
      <input type="text" placeholder="¿Donde queres mudarte?"></input>
      </div>
      <div className="filters-select">
        <select name="" id="">
        <option value="">Quiero comprar</option>
        <option value="">Quiero vender</option>
        <option value="">Quiero alquilar</option>
        </select>
      </div>
      <button><img src={search} alt="search" /></button>
    </div>
  )
}
