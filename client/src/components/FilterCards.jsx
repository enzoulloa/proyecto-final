import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBy, orderOwnerships, filterCards } from "../redux/actions";
import "../scss/filterCards.scss";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FiltersCards() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({ op: "", type: "" });
  const [params, setParams] =  useSearchParams();
  const [value, setValue] = useState("")
  const navigate = useNavigate()

   useEffect(() => {
    navigate("/listings")
  },[]);
 
  const handleFilter = (e) => {
    const value = { ...filterParams, [e.target.name]: e.target.value };
    setFilterParams(value);
    dispatch(filterBy(value));
  };

  const handleOrder = (e) => {
    dispatch(orderOwnerships(e.target.value));
  };

  const handleParams=(e)=>{
    if(!params.has("min","max","type","garage","rooms")){
      const value={[e.target.name]:e.target.value}
      setParams(value)
      dispatch(filterCards(params))
    }else if(params.has(!e.target.name)){
        params.set(e.target.name,e.target.value)
        setParams(params)
      }
      dispatch(filterCards(params))
      }

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

        <select name="type" id="" onChange={e=>handleParams(e)}>
          <option disabled="disabled" selected={true}>
            Tipo de propiedad
          </option>
          <option name="type" value="house">Casa</option>
          <option name="type" value="department">Departamento</option>
          <option name="type" value="PH">Ph</option>
        </select>

        <select name="" id="" onChange={handleOrder}>
          <option selected={true} disabled="disabled">
            Ordenar por
          </option>
          <option value="ASC">Menor precio</option>
          <option value="DESC">Mayor precio</option>
        </select>
         <div>
           <span>Desde: </span><select name="min" id="" onChange={e=>handleParams(e)}>
          <option name="min" value="0">0</option>
          <option name="min" value="50000">50000</option>
          <option name="min" value="75000">75000</option>
          <option name="min" value="100000">100000</option>
          <option name="min" value="125000">125000</option>
          <option name="min" value="150000">150000</option>
          <option name="min" value="200000">200000</option>
          </select>

          <span>Hasta: </span><select name="max" id="" onChange={e=>handleParams(e)}>
          <option name="max" value="0">0</option>
          <option name="max" value="50000">50000</option>
          <option name="max" value="75000">75000</option>
          <option name="max" value="100000">100000</option>
          <option name="max" value="125000">125000</option>
          <option name="max" value="150000">150000</option>
          <option name="max" value="200000">200000</option>
          </select>
        </div>

        <select name="garage" id="" onChange={e=>handleParams(e)}>
          <option selected={true} disabled="disabled">
            Cochera
          </option>
          <option name="garage" value="0">0</option>
          <option name="garage" value="1">1</option>
        </select>

        <select name="rooms" id="" onChange={e=>handleParams(e)}>
          <option selected={true} disabled="disabled">
            Habitaciones
          </option>
          <option name="rooms" value="1">1</option>
          <option name="rooms" value="2">2</option>
          <option name="rooms" value="3">3</option>
        </select>
      </div>
    </div>
  );
}
