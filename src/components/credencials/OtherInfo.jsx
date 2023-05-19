import React, { useEffect, useState } from "react";

function OtherInfo({ formData, setFormData }) {
  //Referencias
  const [respostas, setRespostas] = useState([]);
  const [novaResposta, setNovaResposta] = useState("");

  //Areas de atuação
  const [respostasAtuacao, setRespostasAtuacao] = useState([]);
  const [novaRespostaAtuacao, setNovaRespostaAtuacao] = useState("");
  //Referencias
  const handleRespostaChange = (event) => {
    const novaResposta = event.target.value;
    setNovaResposta(novaResposta);
  };

  const handleAdicionarResposta = () => {
    setRespostas([...respostas, novaResposta]);
    setNovaResposta("");
    setFormData({ ...formData, referencias: respostas });
    
  };
  const handleRemoverResposta = () => {
    setFormData({ ...formData, referencias: respostas.pop() });
  };
  //Areas de atuação
  const handleRespostaChangeAtuacao = (event) => {
    const novaRespostaAtuacao = event.target.value;
    setNovaRespostaAtuacao(novaRespostaAtuacao);
  };

  const handleAdicionarRespostaAtuacao = () => {
    setRespostasAtuacao([...respostasAtuacao, novaRespostaAtuacao]);
    setNovaRespostaAtuacao("");
    setFormData({ ...formData, areasDeAtuação: respostasAtuacao });
  };
  const handleRemoverRespostaAtuacao = () => {
    setFormData({ ...formData, areasDeAtuação: respostasAtuacao.pop() });
  };
  //useEffect
  useEffect(() => {
    setFormData({ ...formData, areasDeAtuação: respostasAtuacao });
  }, [respostasAtuacao, setFormData]);
  useEffect(() => {
    setFormData({ ...formData, referencias: respostas });
  }, [respostas, setFormData]);
  return (
    <div className="other-info-container">
      <label className="labelOtherInfo">
        <div className="label">
          Referencias:
        </div>
        
        <input
          type="text"
          value={novaResposta}
          onChange={handleRespostaChange}
        />
      </label>
      <div className="options">
        <button className="add" type="button" onClick={handleAdicionarResposta}>
          Adicionar
        </button>
        <button
          className="buttonTrash"
          onClick={() => {
            handleRemoverResposta();
          }}
        >
          &#128465;
        </button>
      </div>

      <ul>
        {respostas.map((resposta, index) => (
          <li className="list" key={index}>{resposta}</li>
        ))}
      </ul>
      <label className="labelOtherInfo">
        <div className="label">
          Todas as funções:
        </div>
        
        <input
          type="text"
          value={novaRespostaAtuacao}
          onChange={handleRespostaChangeAtuacao}
        />
      </label>
      <div className="options">
        <button
          className="add"
          type="button"
          onClick={handleAdicionarRespostaAtuacao}
        >
          Adicionar
        </button>
        <button
          className="buttonTrash"
          onClick={() => {
            handleRemoverRespostaAtuacao();
          }}
        >
          &#128465;
        </button>
      </div>
      <ul>
        {respostasAtuacao.map((resposta, index) => (
          <li key={index}>{resposta}</li>
        ))}
      </ul>
    </div>
  );
}

export default OtherInfo;
