import React from "react";
import './ButtonFavorite.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, userFavorite, deleteFavorite } from "../../redux/actions";

export default function BottonFavotire({id}){

    const dispatch = useDispatch()
    const userLogin = JSON.parse(localStorage.getItem("UserLogin"))
    const stateFavorite = useSelector((state)=>state.userFavorite)
  
    const verifiaction = stateFavorite.length? stateFavorite.find(el=>el.id === id): false

    const bodyFavorite = {
        id: id,
        idUser: userLogin.id
    }

    function handlerClickAdd(){
        dispatch(addfavorite(bodyFavorite))
    }
    function handlerClickDelete(){
        dispatch(deleteFavorite(bodyFavorite))
    }

    return(
        <>
        {
            verifiaction? 
            <button className="favotire-btn-delete" onClick={()=>handlerClickDelete()}>-</button>:
            <button className="favotire-btn-add" onClick={()=>handlerClickAdd()}>+</button>
        }
        </>
    )
}