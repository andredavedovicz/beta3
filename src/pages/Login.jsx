import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SMOBILI from "../assets/SMOBILIC.png";
function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/home");
    });
  };
  return (
    <div className="loginPage">
      <>
        <img src={SMOBILI} alt="SMOBILI" />
        <h2>SISTEMA DE<br/> MANUTENÇÃO</h2>
      </>

      <p>Sign in With Google to Continue:</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
