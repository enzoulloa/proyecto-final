import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetStatusLogin } from '../../../redux/actions.js'

export default function SignUp(){

	const dispatch = useDispatch();

	const [errors, setErrors] = useState({})
	const [singUp, setSingUp] = useState ({
		name: '',
		email:'',
		password:'',
	})

	function handlerLogin(){
		dispatch(GetStatusLogin(true))
	}

	function validate(e){
		let errors = {};
		if(e.name.length < 4){
			errors.name = "Ingresa Nombre mas largo!"
		}
		if(!e.name){
			errors.name = "Ingresa Nombre!"
		}
		if(e.name.length > 255){
			errors.name = `Nombre muy largo (Caracteres: ${singUp.name.length})`
		}
		if(!e.email.length){
			errors.email = "Ingresa Email!"
		}
		if(e.email.length > 255){
			errors.email = `Email muy largo (Caracteres: ${singUp.name.length})`
		}
		if(!e.password.length){
			errors.password = "Ingresa Constrasena!"
		}
		if(e.password.length > 255){
			errors.password = `Contrasena muy largo (Caracteres: ${singUp.name.length})`
		}
		return errors
	}

	function handdleCheckSingUp(e){
		const value = {...singUp, [e.target.name]: e.target.value}
			setSingUp(value);
			setErrors(validate(value))
	}
	

    return(
        <section>
			<div className="page">
				<div className="welcome">
					<h2>Bienvenido!!</h2>
					<p>si ya tienes un usuario, inicia sesion.</p>
					<button className="sign_in" onClick={e=>handlerLogin(e)}>Ingresar</button>
				</div>
				<div className="sign_up">
					<form>
					<h2>Registrate</h2>
					<input type="text" name="name" placeholder="Nombre Completo" value={singUp.name} onChange={e=>handdleCheckSingUp(e)} autocomplete="off" required/><br/>
					{ errors.name && (<p>{errors.name}</p>)}
					<input type="email" name="email" placeholder="Email" onChange={e=>handdleCheckSingUp(e)} autocomplete="off" required/><br/>
					{ errors.email && (<p>{errors.email}</p>)}
					<input type="password" name="password" placeholder="Contraseña" onChange={e=>handdleCheckSingUp(e)} autocomplete="off" required/><br/>
					{ errors.password && (<p>{errors.password}</p>)}
					<input type="submit" name="sign_up" value="Registrarme" className="up"/>
					</form>
				</div>
			</div>
		</section>
    )
}