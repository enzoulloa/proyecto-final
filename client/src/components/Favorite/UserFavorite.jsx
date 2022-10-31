import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFavorite } from "../../redux/actions";
import Error from "../Error";
import Cards from "../cards/Cards";
import FiltersCards from "../FilterCards";


export default function UserFavorite(){

  const dispatch = useDispatch()
  const userFavorites = useSelector((state)=>state.userFavorite)
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"))

  useEffect(()=>{
    dispatch(userFavorite())
  },[dispatch])



  return(
    <div>
      <h2>Propiedades Favoritas</h2>
      <Cards ownerships={userFavorites} />
    </div>
  )
}