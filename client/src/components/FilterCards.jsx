import React from "react";
import { useDispatch } from "react-redux";
import {
  filterByOperation,
  filterByType,
  orderOwnerships,
} from "../redux/actions";
import "../scss/filterCards.scss";

export default function FiltersCards() {
  const dispatch = useDispatch();

  const handleFilterByOperation = (e) => {
    dispatch(filterByOperation(e.target.value));
  };

  const handleFilterByType = (e) => {
    dispatch(filterByType(e.target.value));
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
        <select name="" id="" onChange={handleFilterByOperation}>
          <option selected={true} disabled="disabled">
            Tipo de operacion
          </option>
          <option value="for sell">Quiero comprar</option>
          {/* <option value="">Quiero vender</option> */}
          <option value="for rent">Quiero alquilar</option>
        </select>

        <select name="" id="" onChange={handleFilterByType}>
          <option selected={true} disabled="disabled">
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
