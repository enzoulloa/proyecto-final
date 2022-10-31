import React from "react";
import './ButtonFavorite.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, userFavorite, deleteFavorite } from "../../redux/actions";
import './ButtonFavorite.scss'

export default function BottonFavotire({id}){

    const dispatch = useDispatch()
    const userLogin = JSON.parse(localStorage.getItem("UserLogin"))
    const stateFavorite = useSelector((state)=>state.userFavorite)
  
    useEffect(()=>{
        dispatch(userFavorite())
    },[dispatch])

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
        <div className="cont_button_favorite">
            {
                verifiaction? 
                <button className="favotire-btn-delete botton_favorite" onClick={()=>handlerClickDelete()}><img src="https://cdn-icons-png.flaticon.com/512/4208/4208420.png" /></button>:
                <button className="favotire-btn-add botton_favorite" onClick={()=>handlerClickAdd()}><img src="https://cdn-icons-png.flaticon.com/512/4208/4208394.png" /></button>
            }
        </div>
    )
}