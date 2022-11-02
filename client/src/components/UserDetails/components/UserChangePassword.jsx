import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updatePassword } from "../../../redux/actions.js";
import Swal from "sweetalert2";
import "./UserChangePassword.scss";

export default function UserChangePassword() {
  const userInfo = useSelector((state) => state.userInfo);
  const { user, isLoading } = useAuth0();
  const [errors, setErrors] = useState({ Error: "Error inicial" });
  const dispatch = useDispatch();
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    oldPw: "",
    newPw: "",
    newPwVerifier: "",
  });
  const userID = userInfo.id;

  function validate(e) {
    const validatePassword = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    const errors = {};
    if (!e.oldPw.length) {
      errors.oldPw = "Ingresar Contraseña";
    }
    if (!e.newPw.length) {
      errors.newPw = "Ingresar Contraseña";
    } else if (!validatePassword.test(e.newPw)) {
      errors.newPw = "Contraseña debe tener una mayuscula y un numero";
    }
    if (!e.newPwVerifier.length) {
      errors.newPwVerifier = "Ingresar Contraseña";
    } else if (!validatePassword.test(e.newPwVerifier)) {
      errors.newPwVerifier = "Contraseña debe tener una mayuscula y un numero";
    }

    return errors;
  }

  function handleInputChange(e) {
    const value = { ...passwordChangeForm, [e.target.name]: e.target.value };
    setPasswordChangeForm(value);
    setErrors(validate(value));
  }

  function submitPwChange(e) {
    e.preventDefault();
    if (
      !passwordChangeForm.oldPw ||
      !passwordChangeForm.newPw ||
      !passwordChangeForm.newPwVerifier ||
      errors.newPwVerifier
    ) {
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: "Complete los datos",
      });
      return;
    }
    dispatch(updatePassword({ passwordChangeForm, userID }));
    setPasswordChangeForm({
      oldPw: "",
      newPw: "",
      newPwVerifier: "",
    });
  }

  return (
    <form className="formPasswords">
      <div className="div-password">
        <label>Ingresa tu contraseña actual:</label>
        <input
          type="password"
          name="oldPw"
          value={passwordChangeForm.oldPw}
          onChange={handleInputChange}
        />
        {errors.oldPw && <p className="errors">{errors.oldPw}</p>}
      </div>
      <div className="div-password">
        <label>Ingresa tu contraseña nueva:</label>
        <input
          type="password"
          name="newPw"
          value={passwordChangeForm.newPw}
          onChange={handleInputChange}
        />
        {errors.newPw && <p className="errors">{errors.newPw}</p>}
      </div>
      <div className="div-password">
        <label>Verifica tu contraseña nueva:</label>
        <input
          type="password"
          name="newPwVerifier"
          value={passwordChangeForm.newPwVerifier}
          onChange={handleInputChange}
        />
        {errors.newPwVerifier && (
          <p className="errors">{errors.newPwVerifier}</p>
        )}
      </div>
      <button type="button" onClick={submitPwChange} className="button-18">
        Enviar
      </button>
    </form>
  );
}
