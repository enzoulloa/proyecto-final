import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetStatusLogin } from '../../../redux/actions.js'
import './SignIn.scss';

export default function SignIn(){

	const dispatch = useDispatch();

	const [login, setLogin] = useState({
		email:'',
		password:'',
	})

	function handlerSignUp(e){
		dispatch(GetStatusLogin(false))
	}
	

    return(
		<section>
	    	<div className="page">
	    		<div className="welcome">
	    			<h2>Bienvenido!!</h2>
	    			<p>Si no tienes un usurio podes registrarte.</p>
	    			<button className="sign_in" onClick={e=> handlerSignUp(e)}>Registrarme</button>
	    		</div>
	    		<div className="sign_up">
	    			<form>
	    			<h2>Iniciar Sesion.</h2>
	    			<input type="email" name="email" placeholder="Email" required/><br/>
	    			<input type="password" name="password" placeholder="Password" required/><br/>
	    			<input type="submit" name="sign_up" value="Ingresar" className="up"/>
	    		    </form>
        		</div>
	    	</div>
        </section>
    )
}