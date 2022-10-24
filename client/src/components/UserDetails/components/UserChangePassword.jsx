import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function UserChangePassword() {
  const { user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    oldPw: "",
    newPw: "",
    newPwVerifier: "",
    email: user.name,
  });

  function handleInputChange(e) {
    const value = { ...passwordChangeForm, [e.target.name]: e.target.value };
    setPasswordChangeForm(value);
  }

  function submitPwChange() {
    //dispatch(modificar(password))
    console.log(passwordChangeForm);
  }

  return (
    <div className="changePassword">
      <form>
        <div>
          <label>Enter current password:</label>
          <input
            type="text"
            name="oldPw"
            value={passwordChangeForm.oldPw}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Enter current password:</label>
          <input
            type="text"
            name="newPw"
            value={passwordChangeForm.newPw}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Enter current password:</label>
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
