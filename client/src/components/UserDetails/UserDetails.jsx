import React from "react";
import { useAuth0 } from '@auth0/auth0-react';


export default function UserDetails(){
    const { user} = useAuth0()

    return(
        <div>
            <img src={user.picture}></img>
            <h1>Nombre: {user.given_name}</h1>
            <h2>Email: {user.email}</h2>
        </div>
    )
}