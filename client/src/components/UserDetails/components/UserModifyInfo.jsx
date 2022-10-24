import axios from "axios";
import { useState } from "react";

export default function UserModifyInfo() {
  const [newInfo, setNewInfo] = useState({
    name: null,
    email: null,
    cel: null,
    photo: null,
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

  function submitNewInfo(e) {
    e.preventDefault();
    setNewInfo({
      name: null,
      email: null,
      cel: null,
      photo: null,
    });
  }

  return (
    <div>
      <form>
        <div>
          <p>New profile img: </p>
          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
          <button type="button" onClick={uploadImage}>
            +
          </button>
          {newInfo.photo !== null && (
            <img
              src={newInfo.photo}
              alt="newProfileImg"
              className="newProfileImg"
            />
          )}
        </div>
        <div>
          <p>new cellphone:</p>
          <input type="number" value={newInfo.cel} />
        </div>
        <div>
          <p>new email:</p>
          <input type="text" value={newInfo.email} />
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
