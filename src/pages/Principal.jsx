import React from "react";
import SMOBILI from "../assets/SMOBILIC.png";
//Página padrão
const Principal = () => {
  return (
    <div className="loginPage">
      <img src={SMOBILI} alt="SMOBILI" />
      <h2>
        SISTEMA DE
        <br /> MANUTENÇÃO
      </h2>
    </div>
  );
};

export default Principal;
