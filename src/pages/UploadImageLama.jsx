import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../firebase-config";

function UploadImage() {
  const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [per, setPerc] = useState(null);
    const navigate = useNavigate()
  
    useEffect(() => {
      const uploadFile = () => {
        const name = new Date().getTime() + file.name;
  
        console.log(name);
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImg = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then(() => {
      console.log(imageUpload)
      alert("Image Uploaded");
    });
  };
  useEffect(()=>{
    const uploadFile=()=>{
        const name = new Date().getTime()+ file.name;
    }
    file && uploadFile();
  },[file])
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImg}>Upload Image</button>
    </div>
  );
}
export default UploadImage;
