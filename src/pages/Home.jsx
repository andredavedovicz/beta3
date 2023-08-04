import React, { useState, useEffect } from "react";
import { deleteDoc, getDocs, doc } from "firebase/firestore";
import { collection,query, orderBy} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "postsexample");
  const deletePost = async (id) => {
    const postDoc = doc(db, "postsexample", id);
    await deleteDoc(postDoc);
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    const getPosts = async () => {
      const data = await getDocs(OrderPostList);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [deletePost]);
  const OrderPostList = query(postsCollectionRef,orderBy("postNumber","asc"))

  return (
    <div className="bodyPage">
      <div className="homePage">
        {postList.map((post) => {
          return (
            <div key={post.postNumber} className="post">
              <div className="postHeader">
                
                <div className="title">
                  <h1>OS#{post.postNumber}</h1>
                  
                </div>
                
                <div className="deletePost">
                  {isAuth && "Gy9XDtrBOfb09Y9RujCl0jON0jE2" === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      &#128465;
                    </button>
                  )}
                </div> 
              </div>
              <div className="content postTextContainer">
                <div className="titles">Data:</div>
                {post.dateCreated}
              </div>
              <div className="content postTextContainer">
                <div className="titles">Local:</div>
                {post.title}
              </div>            
              
              <div className="content postTextContainer">
              
                <div className="titles">Objeto:</div>
                {post.objeto}
              </div>
              <div className="content postTextContainer">
                <div className="titles">Tipo:</div>
                {post.tipo}
              </div>
              <div className="content postTextContainer">
                <div className="titles">Status:</div>
                {post.status}
              </div>
              <div className="content postTextContainer">
                <div className="titles">Descrição:</div>
                {post.postText}
              </div>
              
              {post.imageListUrl?.map((image) => {
                return (
                  <a href={image} target="_blank">
                    <img className="imagemOs" src={image} alt={image} />
                  </a>
                );
              })}
              <h3>@{post.author.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
