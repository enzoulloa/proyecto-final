import React from "react";
import "../scss/filtersCards.scss"

export default function FiltersCards(){
  return(
    <div className="containerFilterCards">
      <div className="containerFilterCards-input">
      <input type="text" placeholder="¿Donde queres mudarte?"></input>
      </div>
      <div className="containerFilterCards-select">
        <select name="" id="">
        <option selected="true" disabled="disabled">Tipo de operacion</option>
        <option value="">Quiero comprar</option>
        <option value="">Quiero vender</option>
        <option value="">Quiero alquilar</option>
        </select>

         <select name="" id="">
        <option selected="true" disabled="disabled">Tipo de propiedad</option>
        <option value="">Casa</option>
        <option value="">Departamento</option>
        <option value="">Ph</option>
        </select>

         <select name="" id="">
        <option selected="true" disabled="disabled">Ordenar por</option>
        <option value="">Menor precio</option>
        <option value="">Mayor precio</option>
        </select>
      </div>
    </div>
  )
}