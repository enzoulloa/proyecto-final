import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

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
      `http://api.cloudinary.com/v1_1/dtbxaawjp/image/upload`,
      formData
    );
    setNewInfo({ ...newInfo, photo: [response.data.url] });
  }

  function handleInfoChange(e) {
    const value = { ...newInfo, [e.target.name]: e.target.value };
    setNewInfo(value);
  }

  function submitNewInfo(e) {
    e.preventDefault();
    setNewInfo({
      name: "",
      email: "",
      cel: "",
      photo: "",
    });
  }

  return (
    <div>
      <form>
        <div>
          <p>Modificar nombre:</p>
          <input
            type="text"
            name="name"
            value={newInfo.name}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <p>Modificar imagen de perfil: </p>
          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
          <button type="button" onClick={uploadImage}>
            +
          </button>
          {newInfo.photo !== "" && (
            <img
              src={newInfo.photo}
              alt="newProfileImg"
              className="newProfileImg"
            />
          )}
        </div>
        <div>
          <p>Modificar numero de telefono:</p>
          <input
            type="number"
            name="cel"
            value={newInfo.cel}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <p>Modificar email:</p>
          <input
            type="text"
            name="email"
            value={newInfo.email}
            onChange={handleInfoChange}
          />
        </div>
        <input
          type="submit"
          onClick={submitNewInfo}
          value="Enviar nueva info"
        />
      </form>
    </div>
  );
}
