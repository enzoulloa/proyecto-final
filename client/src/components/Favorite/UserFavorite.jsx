import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFavorite } from "../../redux/actions";
import { Link } from "react-router-dom";
import Error from "../Error";
import Cards from "../cards/Cards";
import FiltersCards from "../FilterCards";
import './UserFavorite.scss'
import Paginated from "../Listing/Paginated/Paginated";
import favorite from "./favorite";

export default function UserFavorite(){

  const dispatch = useDispatch()
  const userFavorites = useSelector((state)=>state.userFavorite)
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"))

  useEffect(()=>{
    dispatch(userFavorite())
  },[dispatch])


  const [currentPage, setCurrentPage] = useState(1);
  const [ownershipsPerPage, setOwnershipsPerPage] = useState(9);
  const indexOfLastOwnerships = currentPage * ownershipsPerPage;
  const indexOfFirstOwnerships = indexOfLastOwnerships - ownershipsPerPage;

  let currentOwnerships = []
  
  if(userFavorites.length > 0){
    currentOwnerships = userFavorites.slice(indexOfFirstOwnerships, indexOfLastOwnerships)
  }

  const pagination = pageNumber => {
    setCurrentPage(pageNumber);
  }

  useEffect(()=>{
    if(userFavorites.length <= 9){
      setCurrentPage(1)
    }
  },[userFavorites])
  function handlerNext(pageNumbers){
    if(pageNumbers > currentPage){
      setCurrentPage(currentPage+1)
    }
  }
  function handlerPrevius(){
    if(currentPage > 1){
      setCurrentPage(currentPage-1)
    }
      
  }
  


  return(
    <div className="cont-cont-favorite">
      {
        userFavorites.length? 
        <div className="cont-favorite-listing">
          <h2>Mis Favoritas</h2>
          <Cards ownerships={currentOwnerships} />
            <Paginated 
              ownershipsPerPage={ownershipsPerPage}
              allOwnerships={userFavorites.length}
              pagination={pagination}
              currentPage={currentPage}
              next={handlerNext}
              previus={handlerPrevius}
            />
        </div>:
        <div className="error-no-favorite">
        <h1>No Posees Favoritos</h1>
        <Link to='/listado'><p>Ver Todas Las Propiedades</p></Link>
        </div>
      }
      
    </div>
  )
}