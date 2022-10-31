import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, orderOwnerships, filterCards } from "../redux/actions";
import "../scss/filterCards.scss";
import { useSearchParams } from "react-router-dom";

export default function FiltersCards() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({ op: "", type: "" });
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const ownerships = useSelector((state) => state.ownerships);
  const prov = [...new Set(ownerships.map((item) => item.location))];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setSearch(searchTerm);
    params.set("location", searchTerm);
    dispatch(filterCards(params));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(orderOwnerships(e.target.value));
  };

  const handleParams = (e) => {
    e.preventDefault();
    if (!e.target.name) {
      params.set("location", search);
      dispatch(filterCards(params));
      setSearch("");
    }
    params.set([e.target.name], e.target.value);
    dispatch(filterCards(params));
  };

  return (
    <div className="containerFilterCards">
      <div className="searchBar-Container">
        <div className="containerFilterCards-input">
          <input
            type="text"
            name="location"
            value={search}
            placeholder="¿Donde queres mudarte?"
            onChange={(e) => handleSearch(e)}
          ></input>
          <button type="submit" onClick={(e) => handleParams(e)}>
            Buscar
          </button>
        </div>
        <div className="dropdown-cards">
          {prov
            .filter((item) => {
              const searchTerm = search.toLowerCase();
              const location = item.toLowerCase();
              return (
                searchTerm &&
                location.startsWith(searchTerm) &&
                location !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row-Cards"
                key={item}
              >
                {item}
              </div>
            ))}
        </div>
      </div>

      <div className="containerFilterCards-select">
        <select
          className="Operation-select"
          name="state"
          id=""
          onChange={(e) => handleParams(e)}
        >
          <option disabled="disabled" selected={true}>
            Operacion
          </option>
          <option value="sell">Quiero comprar</option>
          <option value="rent">Quiero alquilar</option>
        </select>

        <select
          className="type-select"
          name="type"
          id=""
          onChange={(e) => handleParams(e)}
        >
          <option disabled="disabled" selected={true}>
            Propiedad
          </option>
          <option name="type" value="Casa">
            Casa
          </option>
          <option name="type" value="Departamento">
            Departamento
          </option>
          <option name="type" value="PH">
            Ph
          </option>
          <option name="type" value="Duplex">
            Duplex
          </option>
          <option name="type" value="Terreno">
            Terreno
          </option>
          <option name="type" value="Cochera">
            Cochera
          </option>
        </select>
        <select className="price-order" name="" id="" onChange={handleOrder}>
          <option selected={true} disabled="disabled">
            Ordenar por
          </option>
          <option value="ASC">Menor precio</option>
          <option value="DESC">Mayor precio</option>
        </select>

        <div className="price-select">
          <span>Desde: </span>
          <select name="min" id="" onChange={(e) => handleParams(e)}>
            <option name="min" value="0">
              0
            </option>
            <option name="min" value="50000">
              50000
            </option>
            <option name="min" value="75000">
              75000
            </option>
            <option name="min" value="100000">
              100000
            </option>
            <option name="min" value="125000">
              125000
            </option>
            <option name="min" value="150000">
              150000
            </option>
            <option name="min" value="200000">
              200000
            </option>
          </select>
          <span>Hasta: </span>
          <select name="max" id="" onChange={(e) => handleParams(e)}>
            <option name="max" value="0">
              0
            </option>
            <option name="max" value="50000">
              50000
            </option>
            <option name="max" value="75000">
              75000
            </option>
            <option name="max" value="100000">
              100000
            </option>
            <option name="max" value="125000">
              125000
            </option>
            <option name="max" value="150000">
              150000
            </option>
            <option name="max" value="200000">
              200000
            </option>
          </select>
        </div>

        <select
          className="garage-select"
          name="garage"
          id=""
          onChange={(e) => handleParams(e)}
        >
          <option selected={true} disabled="disabled">
            Cochera
          </option>
          <option name="garage" value="0">
            No
          </option>
          <option name="garage" value="1">
            Si
          </option>
        </select>
        <select
          className="rooms-select"
          name="rooms"
          id=""
          onChange={(e) => handleParams(e)}
        >
          <option selected={true} disabled="disabled">
            Habitaciones
          </option>
          <option name="rooms" value="1">
            1
          </option>
          <option name="rooms" value="2">
            2
          </option>
          <option name="rooms" value="3">
            3
          </option>
          <option name="rooms" value="4">
            4
          </option>
          <option name="rooms" value="5">
            5
          </option>
          <option name="rooms" value="6">
            6
          </option>
          <option name="rooms" value="7">
            7
          </option>
        </select>
      </div>
    </div>
  );
}
