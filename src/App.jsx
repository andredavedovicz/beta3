import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import UploadImage from "./pages/UploadImage"
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

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
    <Router>
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
        <Route path="/uploadimage" element={<UploadImage/>} />
      </Routes>
    </Router>
  );
}

export default App;
