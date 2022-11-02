import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginModal.scss";
import ButtonGoogle from "../Login Google/ButtonGoogle.jsx";
import {
  LoginUser,
  LoginStatus,
  statusUser,
  ModalSign,
} from "../../../redux/actions.js";
import Error from "../../Error";

export default function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const satusUser = useSelector((state) => state.user);
  const [errors, setErrors] = useState({ Error: "Error inicial" });
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(LoginStatus());
  }, [satusUser]);

  function validate(e) {
    const validateEmails =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validatePassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    const errors = {};
    if (!e.email) {
      errors.email = "Ingresar Email";
    } else if (!validateEmails.test(e.email)) {
      errors.email = "Mail incorrecto";
    }
    if (!e.password.length) {
      errors.password = "Ingresar Contraseña";
    } else if (!validatePassword.test(e.password)) {
      errors.password = "Contraseña debe tener una mayuscula y un numero";
    } else if (e.password.length < 8) {
      errors.password = "Contraseña debe tener 8 Caracteres";
    }

    return errors;
  }

  function handdleCheckSingIn(e) {
    const value = { ...signIn, [e.target.name]: e.target.value };
    setSignIn(value);
    setErrors(validate(value));
  }

  function handlerSubmit() {
    dispatch(LoginUser(signIn));
    console.log(signIn)
    setSignIn({
      email: "",
      password: "",
    });
    navigate('/')
  }

  function handlerStatusUser() {
    dispatch(statusUser(false));
  }
  return (
    <div>
      {satusUser === "No Logueado" ? (
        <section className="section-modal-login">
          <div className="modal_page">
            <div className="welcome_modal">
              <h2>Bienvenido!!</h2>
              <p>Si no tienes un usurio podes registrarte.</p>
              <button
                className="sign_in_modal"
                onClick={() => handlerStatusUser()}
              >
                Registrarme
              </button>
              <ButtonGoogle />
            </div>
            <div className="sign_up_modal">
              <form onSubmit={() => handlerSubmit()}>
                <h2>Iniciar Sesion.</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handdleCheckSingIn(e)}
                  required
                />
                <br />
                {errors.email && <p>{errors.email}</p>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handdleCheckSingIn(e)}
                  required
                />
                <br />
                {errors.password && <p>{errors.password}</p>}
                {Object.keys(errors).length !== 0 ? (
                  <input
                    type="submit"
                    name="sign_up"
                    value="Ingresar"
                    className="up-off_modal"
                    disabled={true}
                  />
                ) : (
                  <input
                    type="submit"
                    name="sign_up"
                    value="Ingresar"
                    className="up_modal"
                  />
                )}
              </form>
            </div>
          </div>
        </section>
      ) : (
        <Error />
      )}
    </div>
  );
}
