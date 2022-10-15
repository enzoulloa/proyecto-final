import React from "react";
import { useDispatch } from "react-redux";
import { filterByOperation } from "../redux/actions";
import { filterByOp } from "../redux/common";
import "../scss/filterCards.scss";

export default function FiltersCards({ ownerships }) {
  const dispatch = useDispatch();

  const handleFilterByOperation = (e) => {
    dispatch(filterByOperation(e.target.value));
    console.log(e.target.value);
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
          <option value="">Quiero vender</option>
          <option value="for rent">Quiero alquilar</option>
        </select>

        <select name="" id="">
          <option selected={true} disabled="disabled">
            Tipo de propiedad
          </option>
          <option value="">Casa</option>
          <option value="">Departamento</option>
          <option value="">Ph</option>
        </select>

        <select name="" id="">
          <option selected={true} disabled="disabled">
            Ordenar por
          </option>
          <option value="">Menor precio</option>
          <option value="">Mayor precio</option>
        </select>
      </div>
    </div>
  );
}
