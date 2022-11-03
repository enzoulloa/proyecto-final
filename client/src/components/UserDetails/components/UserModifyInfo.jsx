import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../redux/actions.js";
import "./UserModifyInfo.scss";

export default function UserModifyInfo() {
  const user = useSelector((state) => state.userInfo);
  const [newInfo, setNewInfo] = useState({
    name: "",
    email: "",
    cel: "",
    photo: "",
  });
  const [imageSelected, setImageSelected] = useState("");
  async function uploadImage() {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "iu0b2lxj");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dtbxaawjp/image/upload`,
      formData
    );
    setNewInfo({ ...newInfo, photo: [response.data.url] });
  }
  const dispatch = useDispatch();
  const userID = user.id;

  function handleInfoChange(e) {
    const value = { ...newInfo, [e.target.name]: e.target.value };
    setNewInfo(value);
  }

  function submitNewInfo(e) {
    e.preventDefault();
    dispatch(updateUserData({ newInfo, userID }));
    setNewInfo({
      name: "",
      email: "",
      cel: "",
      photo: "",
    });
  }

  return (
    <form className="form-update">
      <div className="div-update">
        <label>Modificar nombre:</label>
        <input
          type="text"
          name="name"
          value={newInfo.name}
          onChange={handleInfoChange}
        />
      </div>
      <div className="div-update">
        <div className="div-file photo-row">
          <label htmlFor="btn-file">Click aqui para buscar imagen </label>
          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
            id="btn-file"
          />

          {newInfo.photo !== "" ? (
            <img
              src={newInfo.photo}
              alt="newProfileImg"
              className="newProfileImg photo-ubic"
            />
          ) : (imageSelected ? <p>Foto seleccionada</p> : <p>No hay foto seleccionada</p>)}
        </div>
        <button type="button" onClick={uploadImage} className="btn-mas button-18">
          Cargar imagen
        </button>
      </div>
      <div className="div-update">
        <label>Modificar numero de telefono:</label>
        <input
          type="number"
          name="cel"
          value={newInfo.cel}
          onChange={handleInfoChange}
        />
      </div>
      <div className="div-update">
        <label>Modificar email:</label>
        <input
          type="text"
          name="email"
          value={newInfo.email}
          onChange={handleInfoChange}
        />
      </div>

      <button type="submit" onClick={submitNewInfo} className="button-18">
        Enviar nueva informacion
      </button>
    </form>
  );
}
