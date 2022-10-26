import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFavorite } from "../../redux/actions";
import Error from "../Error";


export default function UserFavorite(){

  const dispatch = useDispatch()
  const userFavorites = useSelector((state)=>state.userFavorite)
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"))

  useEffect(()=>{
    dispatch(userFavorite())
  },[dispatch])


  return(
    <div>
      {
        userLogin?
        <h1>{JSON.stringify(userFavorites)}</h1>:
        <Error/>
      }
    </div>
  )
}