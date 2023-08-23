import React from "react";
//Parte 1 do Credenciamento
function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="Seu nome..."
        value={formData.nome}
        onChange={(e) => {
          setFormData({ ...formData, nome: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Função Principal..."
        value={formData.cargo}
        onChange={(e) => {
          setFormData({ ...formData, cargo: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="email..."
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="celular..."
        value={formData.celular}
        onChange={(e) => {
          setFormData({ ...formData, celular: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Conta corrente..."
        value={formData.contaCorrente}
        onChange={(e) => {
          setFormData({ ...formData, contaCorrente: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="PIX..."
        value={formData.pix}
        onChange={(e) => {
          setFormData({ ...formData, pix: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;