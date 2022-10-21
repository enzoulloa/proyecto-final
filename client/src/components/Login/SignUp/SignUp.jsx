import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {UserRegister } from '../../../redux/actions.js';
import ButtonGoogle from "../Login Google/ButtonGoogle.jsx";
import Error from "../../Error.jsx";

export default function SignUp(){

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errors, setErrors] = useState({ Error:'error inicial'})
	const [singUp, setSingUp] = useState ({
		name: '',
		email:'',
		password:'',
		password2:'',
		phone: '',
	})

	function validate(e){
		let errors = {};
		if(!e.name){
			errors.name = "Ingresa Nombre!"
		}
		else if(e.name.length < 4){
			errors.name = "Ingresa Nombre mas largo!"
		}
		else if(e.name.length > 255){
			errors.name = `Nombre muy largo (Caracteres: ${e.name.length})`
		}
		else if(!e.email.length){
			errors.email = "Ingresa Email!"
		}
		else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(e.email)){
			errors.email = 'Mail incorrecto'
		}
		else if(e.email.length > 255){
			errors.email = `Email muy largo (Caracteres: ${e.name.length})`
		}
		else if(!e.password.length){
			errors.password = "Ingresa Constrasena"
		}
		else if(!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(e.password)){
			errors.password = 'Contraseña debe tener una mayuscula y un numero'
		}
		else if(e.password.length < 8){
			errors.password = 'Contraseña debe tener 8 Caracteres'
		}
		else if(e.password.length > 255){
			errors.password = `Contrasena muy largo (Caracteres: ${e.name.length})`
		}
		else if(!e.password2.length){
			errors.password2 = "Ingresa Contraseña!"
		}
		else if(e.password2 !== singUp.password){
			errors.password2 = 'Contraseña no coinciden'
		}
		else if(!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(e.phone)){
			errors.phone = `Numero Incorrecto`
		}
		else if(!e.phone){
			errors.phone = `Ingresa el numero de telefono`
		}
		return errors
	}

	function handdleCheckSingUp(e){
		const value = {...singUp, [e.target.name]: e.target.value}
			setSingUp(value);
			setErrors(validate(value))
	}
	
	function handleSubmit(){
		const post = {
			name: singUp.name,
			email: singUp.email,
			password: singUp.password,
			cel: singUp.phone,
		}
		dispatch(UserRegister(post));
		setSingUp({
			name: '',
			email:'',
			password:'',
			password2:'',
			phone: '',
		})
		navigate('/signin')
	}

	const UserLogin = localStorage.getItem('UserLogin')

    return(
        <section>
			<div className="page">
				<div className="welcome">
					<h2>Bienvenido!!</h2>
					<p>si ya tienes un usuario, inicia sesion.</p>
					<Link to='/signin'>
					<button className="sign_in" /* onClick={e=>handlerLogin(e)} */>Ingresar</button>
					</Link>
					<ButtonGoogle/>
				</div>
				<div className="sign_up">
					<form onSubmit={()=>handleSubmit()}>
					<h2>Registrate</h2>
					<input type="text" name="name" placeholder="Nombre Completo" value={singUp.name} onChange={e=>handdleCheckSingUp(e)} required/><br/>
					{ errors.name && (<p>{errors.name}</p>)}
					<input type="email" name="email" placeholder="Email" onChange={e=>handdleCheckSingUp(e)} required/><br/>
					{ errors.email && (<p>{errors.email}</p>)}
					<input type="password" name="password" placeholder="Contraseña" onChange={e=>handdleCheckSingUp(e)} required/><br/>
					{ errors.password && (<p>{errors.password}</p>)}
					<input type="password" name="password2" placeholder="Verifica la Contraseña" onChange={e=>handdleCheckSingUp(e)} required/><br/>
					{ errors.password2 && (<p>{errors.password2}</p>)}
					<input type="number" name="phone" placeholder="Numero" onChange={e=>handdleCheckSingUp(e)} required/><br/>
					{ errors.phone&& (<p>{errors.phone}</p>)}
					{
						Object.keys(errors).length !== 0?
						<input type="submit" name="sign_up" value="Registrarme" className="up-off" disabled={true}/>:
						<input type="submit" name="sign_up" value="Registrarme" className="up"/>
					}
					</form>
				</div>
			</div>
		</section>
		
    )
}