import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import SignIn from "./SignIn/SignIn.jsx";
import SignUp from './SignUp/SignUp.jsx'

export default function Login(){

	const status = useSelector(state=> state.statuslogin)

    return(
		<div>
			{
				status === true?
				<SignIn/>:
				<SignUp/>
			}
		</div>
        
    )
}