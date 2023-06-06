import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../firebase-config";

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImg = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then(() => {
      console.log(imageUpload);
      alert("Image Uploaded");
    });
  };

  return (
    <>
      <label>Registro Fotográfico:</label>
      <input
        type="file"
        className="inputImg"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className="buttonImg" onClick={uploadImg}>
        Baixar Imagem
      </button>
    </>
  );
}
export default UploadImage;
