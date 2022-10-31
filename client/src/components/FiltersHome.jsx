import React,{ useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetOwnerships, filterCards } from "../redux/actions"
import icon from "../assets/search.svg";
import "../scss/filtersHome.scss";

export default function FiltersHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params, setParams] =  useSearchParams();
  const [search, setSearch] = useState("")
  const ownerships = useSelector((state) => state.ownerships);
  //ownerships.map(item=>console.log(item.location))
  const prov = [...new Set(ownerships.map(item=>item.location))]
  
  const handleSearch = (e)=>{
    e.preventDefault()
    setSearch(e.target.value)
  }

  const onSearch = (searchTerm) =>{
    setSearch(searchTerm)
    params.set("location",searchTerm)
    console.log(params.set("location",search))
    dispatch(filterCards(params)) 
  }

  const handleButton = async (params) =>{
     navigate("/listings")
     setSearch("")
  }

  return (
    <>
    <div className="filter-column">
    <div className="filters">
      <div className="filters-input">
        <input type="text" placeholder="¿Donde queres mudarte?" value={search} onChange={(e)=>handleSearch(e)} autoComplete="off"></input>
      </div>
      <div className="button-ct-searbarhome">
      <button onClick={handleButton}>
        <img src={icon} alt="search" />
      </button>
      
      </div>
    </div>
    <div className="dropdown-container">
     <div className="dropdown">
        {
          
          prov.filter(item=>{
            const searchTerm = search.toLowerCase()
            const location = item.toLowerCase()
            return (
              searchTerm &&
              location.startsWith(searchTerm)) &&
              location !== searchTerm
          })
          .slice(0,10)
          .map((item)=> (
          <div onClick={()=>onSearch(item)}
          className="dropdown-row"
          key={item}>
            {item}
          </div>)
        )}
      </div>
      </div>
      </div>
    </>
  );
}
