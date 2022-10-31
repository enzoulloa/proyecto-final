import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from "./SignIn/LoginModal";
import SignUpModal from "./SignUp/SignUpModal";

export default function ModalUser(){

	const status = useSelector(state=> state.statuslogin)

    return(
		<div>
			{
				status === true?
				<LoginModal/>:
				<SignUpModal/>
			}
		</div>
        
    )
}