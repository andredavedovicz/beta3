import React from "react";

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <input
        type="text"
        placeholder="Nome Fantasia..."
        value={formData.nomeFantasia}
        onChange={(event) =>
          setFormData({ ...formData, nomeFantasia: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="Razão Social..."
        value={formData.razaoSocial}
        onChange={(event) =>
          setFormData({ ...formData, razaoSocial: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="CNPJ..."
        value={formData.cnpj}
        onChange={(event) =>
          setFormData({ ...formData, cnpj: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="Regime Tributário..."
        value={formData.regimeTributario}
        onChange={(event) =>
          setFormData({ ...formData, regimeTributario: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="ie..."
        value={formData.ie}
        onChange={(event) =>
          setFormData({ ...formData, ie: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="im..."
        value={formData.im}
        onChange={(event) =>
          setFormData({ ...formData, im: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="CEP..."
        value={formData.cep}
        onChange={(event) =>
          setFormData({ ...formData, cep: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="Endereço..."
        value={formData.endereco}
        onChange={(event) =>
          setFormData({ ...formData, endereco: event.target.value })
        }
      />
      
    </div>
  );
}

export default SignUpInfo;