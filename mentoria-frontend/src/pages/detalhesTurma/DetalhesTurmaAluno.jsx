import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalhesTurma.css';

function DetalhesTurmaAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tb_turmas/${id}`)
      .then(res => res.json())
      .then(dados => setTurma(dados));
  }, [id]);

  if (!turma) return <div className="carregando">Entrando na sala...</div>;

  return (
    <div className="detalhes-container">
      <header className="header-turma">
        <div className="logo">Mentor<span>IA</span></div>
        <button className="btn-voltar-fixo" onClick={() => navigate(-1)}>← Voltar</button>
      </header>

      <div className="banner-turma">
        <div className="banner-info">
          <h1>{turma.nome_turma}</h1>
          <p>{turma.serie}</p>
          <span>Redação • correções</span>
        </div>
      </div>

      <div className="conteudo-turma">
        <div className="secao-titulo">
          <h2>🖋️ Minhas Redações</h2>
          <button className="btn-enviar" onClick={() => navigate('/enviar-redacao')}>
            + Escrever Redação
          </button>
        </div>
        <div className="lista-vazia">
          <span className="icone-doc">📄</span>
          <p>Nenhuma redação enviada ainda.</p>
          <p className="subtexto">Comece agora mesmo a praticar sua escrita.</p>
          <button className="btn-primeira-redacao" onClick={() => navigate('/enviar-redacao')}>
            Escrever primeira redação
          </button>
        </div>
      </div>
    </div>
  );
}
export default DetalhesTurmaAluno;