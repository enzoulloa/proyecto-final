import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { Link } from "react-router-dom"
import error from "../assets/error.svg"
import "../scss/error.scss"

export default function Error (){
  const dispatch = useDispatch
  return(
    <div className="error">
      <img src={error} alt="error" />
      <h2>No se encontraron resultados</h2>
    </div>
  )
}