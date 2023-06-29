import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function CreatePost({ isAuth }) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [objeto, setObjeto] = useState("");
  const [postText, setPostText] = useState("");
  const [tipo, setTipo] = useState("Manutenção");
  const [status, setStatus] = useState("Não Interrompe a atividade");
  const [image, setImage] = useState("");

  const postsCollectionRef = collection(db, "postsexample");

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const createPost = async () => {
    {title == ""?setTitleColor("red"):setTitleColor("green")}
    {objeto == ""?setObjetoColor("red"):setObjetoColor("green")}
    {image == ""?setImageColor("red"):setImageColor("green")}
    {postText == ""?setPostTextColor("red"):setPostTextColor("green")}
    
    if(title !== "" && objeto !== "" && postText !== "" && image !== ""){
      await addDoc(postsCollectionRef, {
      title,
      objeto,
      tipo,
      status,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      image,
    });
    navigate("/home");
    }
    else{
      alert("Formulário Inválido!")
    }
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  const imageListRef = ref(storage, "/images");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `imagesexample/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded!");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        setImage(url);
        setImageColor("green")
      });
    });
    
  };
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const [titleColor, setTitleColor] = useState("inputGp");
  const [objetoColor, setObjetoColor] = useState("inputGp");
  const [postTextColor, setPostTextColor] = useState("inputGp");
  const [imageColor, setImageColor] = useState("inputGp");
  
  return (
    <div className="bodyPage">
      <div className="createPostPage">
        <div className="cpContainer">
          <div className="inputGp" style={{border:`3px solid ${titleColor}`}}>
            <label>Local:</label>
            <input
              placeholder="Local..."
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          <div className="inputGp" style={{border:`3px solid ${objetoColor}`}}>
            <label>Objeto da Manutenção:</label>
            <input
              placeholder="Objeto..."
              onChange={(event) => setObjeto(event.target.value)}
            ></input>
          </div>
          <div className="inputGp2" style={{border:`3px solid ${imageColor}`}}>
            <label>Registro Fotográfico:</label>
            <input
              type="file"
              className="inputImg"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
            <div className="baixarImg">
              <button onClick={uploadImage} className="buttonImg" style={{backgroundColor:`${imageColor}`}}>
              Baixar Imagem
            </button>
            { imageColor == "red"?(
              image == ""?
            <div>&#10060;</div>:(
              <div>&#10004;</div>
            )
            ):("")}
            </div>
            
          </div>

          <div className="inputGp" style={{border:`3px solid ${postTextColor}`}}>
            <label>Descrição:</label>
            <textarea
              placeholder="Descrição..."
              onChange={(event) => setPostText(event.target.value)}
              className="description"
            />
          </div>
          <div className="inputGp">
            <label>Tipo de Manutenção:</label>
            <select onChange={(event) => setTipo(event.target.value)}>
              <option value="Manutenção">Manutenção</option>
              <option value="Melhoria">Melhoria</option>
              <option value="Investimento">Investimento</option>
            </select>
          </div>
          <div className="inputGp">
            <label>Manutenção interrompe a atividade? </label>
            <select onChange={(event) => setStatus(event.target.value)}>
              <option value="Não Interrompe a atividade">Não</option>
              <option value="Interrompe a atividade">Sim</option>
            </select>
          </div>
          <button className="submit-post" onClick={createPost}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
