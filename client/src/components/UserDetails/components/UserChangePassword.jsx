import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updatePassword } from "../../../redux/actions.js";

export default function UserChangePassword() {
  const userInfo = useSelector((state) => state.userInfo);
  const { user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    oldPw: "",
    newPw: "",
    newPwVerifier: "",
  });
  const userID = userInfo.id;

  function handleInputChange(e) {
    const value = { ...passwordChangeForm, [e.target.name]: e.target.value };
    setPasswordChangeForm(value);
  }

  function submitPwChange() {
    dispatch(updatePassword({passwordChangeForm, userID}))
    console.log({passwordChangeForm, userID});
  }

  return (
    <div className="changePassword">
      <form>
        <div>
          <label>Ingresa tu contraseña actual:</label>
          <input
            type="text"
            name="oldPw"
            value={passwordChangeForm.oldPw}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ingresa tu contraseña nueva:</label>
          <input
            type="text"
            name="newPw"
            value={passwordChangeForm.newPw}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Verifica tu contraseña nueva:</label>
          <input
            type="text"
            name="newPwVerifier"
            value={passwordChangeForm.newPwVerifier}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={submitPwChange}>
          Submit
        </button>
      </form>
    </div>
  );
}
