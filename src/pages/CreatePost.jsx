import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UploadImage from "./UploadImage";

function CreatePost({ isAuth }) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [objeto, setObjeto] = useState("");
  const [postText, setPostText] = useState("");
  const [tipo, setTipo] = useState("Manutenção");
  const [status, setStatus] = useState("Interrompe a atividade");

  const postsCollectionRef = collection(db, "postsexample");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      objeto,
      tipo,
      status,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/home");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

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
            <UploadImage />
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