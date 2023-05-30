import React, { useState } from "react";
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
  const [password, setPassword] = useState();
  const [valueBlackOut, setValueBlackOut] = useState(true);
  const blackOut = () => {
    let truePassword = "smobili@2023";
    
    if (password === truePassword) {
      setValueBlackOut(false)
    }
    if (password !== truePassword) {
      setValueBlackOut(true)
    }
    
  };
  return (
    <div className="loginPage">
      <>
        <img src={SMOBILI} alt="SMOBILI" />
        <h2>
          SISTEMA DE
          <br /> MANUTENÇÃO
        </h2>
      </>
      {valueBlackOut ? (
        <>
          <input
            className="entrarInput"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={blackOut} className="entrarButton">Permitir Acesso</button>
        </>
      ) : (
        <>
          <p>Entre com o Google para continuar:</p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Entrar com o Google
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
