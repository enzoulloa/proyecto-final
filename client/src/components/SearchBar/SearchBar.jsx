import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  function handleInput(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }

  function handleSearch() {
    console.log(searchTerm);
  }

  return (
    <div>
      <form>
        <label className="searchText">Busca tu propiedad:</label>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInput}
            className="search"
          />
          <input
            type="button"
            value="Go!"
            onClick={handleSearch}
            className="searchIco"
          />
        </div>
      </form>
    </div>
  );
}
