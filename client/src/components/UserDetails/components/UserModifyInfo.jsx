import axios from "axios";

export default function UserModifyInfo(info) {
  async function uploadImage(e) {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "iu0b2lxj");
    const response = await axios.post(
      `http://api.cloudinary.com/v1_1/dtbxaawjp/image/upload`,
      formData
    );
    console.log(response.data.url);
  }

  return (
    <div>
      <form>
        <div>
          <p>Description:</p>
          <input type="text" placeholder="Contanos un poco de vos.." />
        </div>
        <div>
          <p>New profile img: </p>
          <input type="file" onChange={uploadImage} />
        </div>
        <div>
          <p>new cellphone:</p>
          <input type="number" />
        </div>
      </form>
    </div>
  );
}
