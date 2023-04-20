import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { HashRouter, Routes, Route , Link } from "react-router-dom";
import "./App.css";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <HashRouter>
      <nav>
        <Link className="links" to="/">
          OS's
        </Link>

        {!isAuth ? (
          <Link className="links" to="/login">
            Entrar
          </Link>
        ) : (
          <>
            <Link className="links" to="/createpost">
              Criar OS
            </Link>
            <button className="links" onClick={signUserOut}>
              Sair
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </HashRouter>
  );
}
export default App;