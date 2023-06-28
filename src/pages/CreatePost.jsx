import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {storage} from "../firebase-config"
import { ref, uploadBytes,listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function CreatePost({ isAuth }) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [objeto, setObjeto] = useState("");
  const [postText, setPostText] = useState("");
  const [tipo, setTipo] = useState("Manutenção");
  const [status, setStatus] = useState("Interrompe a atividade");
  const [image,setImage] = useState("");

  const postsCollectionRef = collection(db, "postsexample");

  const [imageUpload,setImageUpload] = useState(null)
  const [imageList,setImageList]= useState([])
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      objeto,
      tipo,
      status,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      image
    });
    navigate("/home");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  const imageListRef = ref(storage,"/images")
  const uploadImage = () =>{
      if(imageUpload == null) return;
      const imageRef = ref(storage,`imagesexample/${imageUpload.name + v4()}`)
      uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        alert("Image Uploaded!")
        getDownloadURL(snapshot.ref).then((url)=>{
          setImageList((prev)=>[...prev,url]);
          setImage(url)
        });
      });
  }
  useEffect(() => {
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImageList((prev)=>[...prev,url]);
        })
      })
    })
  }, [])
  
  return (
    <div className="bodyPage">
      <div className="createPostPage">
        <div className="cpContainer">
          <div className="inputGp">
            <label>Local:</label>
            <input
              placeholder="Local..."
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          <div className="inputGp">
            <label>Objeto da Manutenção:</label>
            <input
              placeholder="Objeto..."
              onChange={(event) => setObjeto(event.target.value)}
            ></input>
          </div>
          <div className="inputGp2">
            <label>Registro Fotográfico:</label>
            <input type="file" className="inputImg" onChange={(e)=>{setImageUpload(e.target.files[0])}}/>
            <button onClick={uploadImage} className="buttonImg">Baixar Imagem</button>
          </div>

          <div className="inputGp">
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
              <option value="Interrompe a atividade">Sim</option>
              <option value="Não Interrompe a atividade">Não</option>
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
