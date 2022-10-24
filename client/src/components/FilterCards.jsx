import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBy, orderOwnerships, filterCards, } from "../redux/actions";
import "../scss/filterCards.scss";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FiltersCards() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({ op: "", type: "" });
  const [params, setParams] =  useSearchParams();
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

   useEffect(() => {
    navigate("/listings")
  },[]);

  const handleSearch = (e)=>{
    e.preventDefault()
    setSearch(e.target.value)
  }
 
  const handleFilterAction = (e) => {
    e.preventDefault()
    const data = { ...filterParams, [e.target.name]: e.target.value };
    setFilterParams(data);
    dispatch(filterBy(data));
  };

  const handleOrder = (e) => {
    e.preventDefault()
    dispatch(orderOwnerships(e.target.value));
  };


  const handleParams=(e)=>{
    e.preventDefault()
    if(!e.target.name){
      params.set("location",search)
      dispatch(filterCards(params))
      setSearch("")
    }
      params.set([e.target.name],e.target.value)
      dispatch(filterCards(params))
    
  }

  // const handleParams=(e)=>{
  //   e.preventDefault()
  //   setValue({...value,[e.target.name]:e.target.value.toLowerCase()})
  //   setParams(value)
  //    dispatch(filterCards(params.toString()))
  // }

  return (
    <div className="containerFilterCards">
      <div className="containerFilterCards-input">
        <input type="text" name="location" value={search} placeholder="¿Donde queres mudarte?" onChange={e=>handleSearch(e)}></input>
         <button type="submit" onClick={(e)=>handleParams(e)}>Buscar</button>
      </div>
      <div className="containerFilterCards-select">
        <select name="op" id="" onChange={e=>handleFilterAction(e)}>
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
          <option name="type" value="Casa">Casa</option>
          <option name="type" value="Departamento">Departamento</option>
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
