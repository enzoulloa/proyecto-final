import React from "react";
import { useAuth0 } from '@auth0/auth0-react'

export default function ButtonGoogle(){
    const {user, loginWithRedirect, logout, isLoading, isAuthenticated} = useAuth0()

    return(
        <button className="sign_in_modal_google" onClick={()=>loginWithRedirect()}><p>Ingresar con</p> <sup className="sup1">G</sup><sup className="sup2">o</sup><sup className="sup3">o</sup><sup className="sup4">g</sup><sup className="sup5">l</sup><sup className="sup6">e</sup></button>
    )
}