import React, { useState, useEffect } from "react";
import { deleteDoc, getDocs, doc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { async } from "@firebase/util";
function Home({isAuth}) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "postsexample");
  const deletePost = async (id) => {
    const postDoc = doc(db, "postsexample", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
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
            
            <div className="content postTextContainer"><div className="titles">Objeto:</div>{post.objeto}</div>
            <div className="content postTextContainer"><div className="titles">Tipo:</div>{post.tipo}</div>
            <div className="content postTextContainer"><div className="titles">Status:</div>{post.status}</div>
            <div className="content postTextContainer"><div className="titles">Descrição:</div>{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
