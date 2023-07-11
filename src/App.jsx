import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Principal from "./pages/Principal";
import Credentials from "./pages/Credentials";
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
        {!isAuth ? (
          <>
            <Link className="links" to="/login">
              Cliente
            </Link>
            <Link className="links" to="/credentials">
              Credenciado
            </Link>
          </>
        ) : (
          <>
            <Link className="links" to="/home">
              OS's
            </Link>
            <Link className="links" to="/createpost">
              Criar OS
            </Link>
            <button className="sair" onClick={signUserOut}>
              Sair
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/home" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/credentials" element={<Credentials/>} />
      </Routes>
    </HashRouter>
  );
}
export default App;
