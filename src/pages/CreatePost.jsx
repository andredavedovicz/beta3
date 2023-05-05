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
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");

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
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
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
        <div className="inputGp">
          <UploadImage />
        </div>

        <div className="inputGp">
          <label>Descrição:</label>
          <textarea
            placeholder="Descrição..."
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Tipo de Manutenção:</label>
          <input
            placeholder="Tipo..."
            onChange={(event) => setTipo(event.target.value)}
          ></input>
        </div>
        <div className="inputGp">
          <label>Manutenção interrompe a atividade? </label>
          <input
            placeholder="Não?..."
            onChange={(event) => setStatus(event.target.value)}
          ></input>
        </div>
        <button className="submit-post" onClick={createPost}>
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
