import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalhesTurma.css';

function DetalhesTurmaProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tb_turmas/${id}`)
      .then(res => res.json())
      .then(dados => setTurma(dados));
  }, [id]);

  if (!turma) return <div className="carregando">Carregando dados da turma...</div>;

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
        <div className="codigo-destaque">
          <span>CÓDIGO DA TURMA</span>
          <strong>{turma.codigo_turma}</strong>
        </div>
      </div>

      <div className="conteudo-turma">
        <div className="tabs-selecao">
          <button className="tab ativo">Redações (0)</button>
          <button className="tab">Alunos ({turma.alunos_cont || 0})</button>
        </div>
        <div className="lista-vazia">
          <span className="icone-doc">📄</span>
          <p>Nenhuma redação enviada ainda.</p>
        </div>
      </div>
    </div>
  );
}
export default DetalhesTurmaProfessor;