import { useState } from "react";
import { useDispatch } from "react-redux";

export default function UserChangePassword({ email, password }) {
  const dispatch = useDispatch();
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    oldPw: "",
    newPw: "",
    newPwVerifier: "",
    email: email,
  });

  function handleInputChange(e) {
    const value = { ...passwordChangeForm, [e.target.name]: e.target.value };
    setPasswordChangeForm(value);
  }

  function submitPwChange() {
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
