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
      console.log(imageUpload)
      alert("Image Uploaded");
    });
  };
  
  return (
    <div>
      <label>Registro Fotográfico:</label>
      <input
        type="file"
        className="inputImg"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImg}>Upload Image</button>
    </div>
  );
}
export default UploadImage;
