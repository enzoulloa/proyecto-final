import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from "react-router-dom";
import './SignIn.scss';
import ButtonGoogle from "../Login Google/ButtonGoogle.jsx";
import { LoginUser } from "../../../redux/actions.js";


export default function SignIn(){

	const dispatch = useDispatch();
	const navigate = useNavigate()

	
	const [errors, setErrors] = useState({Error: 'Error inicial'})
	const [signIn, setSignIn] = useState({
		email:'',
		password:'',
	})

	function validate(e){
		const validateEmails = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		const validatePassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/
		const errors = {};
		if(!e.email){
			errors.email = 'Ingresar Email'
		}
		else if (!validateEmails.test(e.email)){
			errors.email = 'Mail incorrecto'
		}
		if(!e.password.length){
			errors.password = 'Ingresar Contraseña'
		}
		else if(!validatePassword.test(e.password)){
			errors.password = 'Contraseña debe tener una mayuscula y un numero'
		}
		else if(e.password.length < 8){
			errors.password = 'Contraseña debe tener 8 Caracteres'
		}

		return errors
	}


	function handdleCheckSingIn(e){
		const value = {...signIn, [e.target.name]: e.target.value}
			setSignIn(value);
			setErrors(validate(value))
	}
	
	function handlerSubmit(){
		dispatch(LoginUser(signIn))
		setSignIn({
			email:'',
			password:'',
		})
		// navigate('/')
	}

    return(
		<section>
	    	<div className="page">
	    		<div className="welcome">
	    			<h2>Bienvenido!!</h2>
	    			<p>Si no tienes un usurio podes registrarte.</p>
					<Link to='/signup'>
	    			<button className="sign_in" /* onClick={e=> handlerSignUp(e)} */>Registrarme</button>
					</Link>
					<ButtonGoogle/>
	    		</div>
	    		<div className="sign_up">
	    			<form onSubmit={()=> handlerSubmit()}>
	    			<h2>Iniciar Sesion.</h2>
	    			<input type="email" name="email" placeholder="Email" onChange={e=>handdleCheckSingIn(e)} required/><br/>
					{ errors.email && (<p>{errors.email}</p>)}
	    			<input type="password" name="password" placeholder="Password" onChange={e=>handdleCheckSingIn(e)} required/><br/>
					{ errors.password && (<p>{errors.password}</p>)}
	    			{
						Object.keys(errors).length !== 0?
						<input type="submit" name="sign_up" value="Ingresar" className="up-off" disabled={true}/>:
						<input type="submit" name="sign_up" value="Ingresar" className="up"/>
					}
	    		    </form>
        		</div>
	    	</div>
        </section>
    )
}