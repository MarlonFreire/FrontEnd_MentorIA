import { useState } from "react";
import "./EnvioRedacao.css"; 

function EnvioRedacao() {
  const [tema, setTema] = useState("");
  const [texto, setTexto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tema || !texto) {
      alert("Preencha todos os campos!");
      return;
    }

    console.log("Tema:", tema);
    console.log("Redação:", texto);

    alert("Redação enviada com sucesso!");
  };

  return (
    <div className="container-redacao">
      <h1>Envio de Redação</h1>

      <form onSubmit={handleSubmit} className="form-redacao">
        
        <label>Tema da redação</label>
        <input
          type="text"
          placeholder="Digite o tema..."
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />

        <label>Sua redação</label>
        <textarea
          placeholder="Escreva sua redação aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button type="submit">Enviar Redação</button>
      </form>
    </div>
  );
}

export default EnvioRedacao;