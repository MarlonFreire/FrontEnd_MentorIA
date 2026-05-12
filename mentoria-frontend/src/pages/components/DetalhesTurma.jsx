import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalhesTurma.css';

function DetalhesTurma() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    setUsuario(userLogado);

    // Busca os dados da turma específica
    fetch(`http://localhost:5000/tb_turmas/${id}`)
      .then(res => res.json())
      .then(dados => setTurma(dados));
  }, [id]);

  if (!turma) return <p>Carregando...</p>;

  return (
    <div className="detalhes-container">
      {/* Header Superior */}
      <header className="header-turma">
        <div className="logo">Mentor<span>IA</span></div>
        <div className="perfil-topo">
          <span>{usuario?.nome}</span>
          <button onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </header>

      {/* Banner Azul principal */}
      <div className="banner-turma">
        <div className="banner-info">
          <h1>{turma.nome_turma}</h1>
          <p>{turma.serie}</p>
        </div>
        
        {/* Só mostra o código se for Professor */}
        {usuario?.tipo === 'professor' && (
          <div className="codigo-destaque">
            <span>CÓDIGO DA TURMA</span>
            <strong>{turma.codigo_turma}</strong>
          </div>
        )}
      </div>

      {/* Área de Conteúdo */}
      <div className="conteudo-turma">
        <div className="tabs-acoes">
          <h2>Minhas Redações</h2>
          {/* Botão de Link para a página da sua colega */}
          {usuario?.tipo === 'aluno' && (
            <button 
              className="btn-enviar"
              onClick={() => navigate('/enviar-redacao')}
            >
              + Escrever Redação
            </button>
          )}
        </div>

        <div className="lista-vazia">
          <img src="/icone-redacao.png" alt="Ícone" />
          <p>Nenhuma redação enviada ainda.</p>
          {usuario?.tipo === 'aluno' && (
            <button onClick={() => navigate('/enviar-redacao')}>Escrever primeira redação</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesTurma;