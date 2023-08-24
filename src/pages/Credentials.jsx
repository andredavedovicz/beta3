//Bibliotecas e componentes externos
import React, { useState } from "react";
import SignUpInfo from "../components/credencials/SignUpInfo";
import PersonalInfo from "../components/credencials/PersonalInfo";
import OtherInfo from "../components/credencials/OtherInfo";
import "../styles/Credentials.css"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

// Página para fazer o credenciamento
function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    regimeTributario: "",
    ie: "",
    im: "",
    endereco: "",
    cep: "",
    referencias:"",
    areasDeAtuação:"",
    nome: "",
    cargo: "",
    email: "",
    celular: "",
    contaCorrente: "",
    pix: "",
    
  });

  const FormTitles = ["Seus Dados", "Dados da Empresa", "Outras Informações"];
  //Troca as páginas
  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  //Manda para o firebase

  const postsCollectionRef = collection(db, "credentials");
  let navigate = useNavigate();
  const createCredential = async () => {
    await addDoc(postsCollectionRef, {
      nomeFantasia: formData.nomeFantasia,
    razaoSocial: formData.razaoSocial,
    cnpj: formData.cnpj,
    regimeTributario: formData.regimeTributario,
    ie: formData.ie,
    im: formData.im,
    endereco: formData.endereco,
    cep: formData.cep,
    referencias:formData.referencias,
    areasDeAtuação:formData.areasDeAtuação,
    nome: formData.nome,
    cargo: formData.cargo,
    email: formData.email,
    celular: formData.celular,
    contaCorrente: formData.contaCorrente,
    pix: formData.pix,
    });
    navigate("/");
  };
  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Anterior
          </button>
          <button
          
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
                createCredential()
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Enviar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;