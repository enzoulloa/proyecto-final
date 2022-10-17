import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBy, orderOwnerships } from "../redux/actions";
import "../scss/filterCards.scss";

export default function FiltersCards() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({ op: "", type: "" });

  const handleFilter = (e) => {
    const value = { ...filterParams, [e.target.name]: e.target.value };
    setFilterParams(value);
    dispatch(filterBy(value));
  };

  const handleOrder = (e) => {
    dispatch(orderOwnerships(e.target.value));
  };

  return (
    <div className="containerFilterCards">
      <div className="containerFilterCards-input">
        <input type="text" placeholder="¿Donde queres mudarte?"></input>
      </div>
      <div className="containerFilterCards-select">
        <select name="op" id="" onChange={handleFilter}>
          <option disabled="disabled" selected={true}>
            Tipo de operacion
          </option>
          <option value="for sell">Quiero comprar</option>
          <option value="for rent">Quiero alquilar</option>
        </select>

        <select name="type" id="" onChange={handleFilter}>
          <option disabled="disabled" selected={true}>
            Tipo de propiedad
          </option>
          <option value="house">Casa</option>
          <option value="department">Departamento</option>
          <option value="PH">Ph</option>
        </select>

        <select name="" id="" onChange={handleOrder}>
          <option selected={true} disabled="disabled">
            Ordenar por
          </option>
          <option value="ASC">Menor precio</option>
          <option value="DESC">Mayor precio</option>
        </select>
      </div>
    </div>
  );
}
