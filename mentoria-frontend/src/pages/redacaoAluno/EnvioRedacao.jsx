import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Adicionado para controle de rotas
import './EnvioRedacao.css';

const EnvioRedacao = () => {
  const { idTurma } = useParams(); // Pega o ID da turma direto da URL
  const navigate = useNavigate();

  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('Rascunho salvo: Agora mesmo');
  const [aluno, setAluno] = useState(null);

  // Carrega os dados do aluno logado para carimbar na redação
  useEffect(() => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      fetch(`http://localhost:5000/tb_alunos?id_usuario=${userLogado.id}`)
        .then(res => res.json())
        .then(dados => {
          if (dados.length > 0) setAluno(dados[0]);
        })
        .catch(err => console.error("Erro ao carregar dados do aluno:", err));
    }
  }, []);

  // Atualiza o contador de palavras e simula o salvamento visual do rascunho
  useEffect(() => {
    const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
    setWordCount(words);

    if (essay.length > 0) {
      setSaveStatus('Salvando...');
      const timer = setTimeout(() => {
        setSaveStatus('Rascunho salvo: Agora mesmo');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [essay]);

  // --- NOVA FUNÇÃO: ENVIA A REDAÇÃO REAL PARA O JSON SERVER ---
  const lidarComEnvio = async (e) => {
    e.preventDefault();

    if (!essay.trim()) {
      alert("Por favor, escreva sua redação antes de enviar para revisão!");
      return;
    }

    if (!aluno) {
      alert("Erro: Dados do estudante não encontrados. Faça login novamente.");
      return;
    }

    // Cria o objeto idêntico à sua tabela do banco SQL tb_redacoes
    const novaRedacao = {
      tema: "Tema Geral - Proposto pelo Professor", // Pode ser dinâmico depois
      texto: essay, // O que o aluno digitou na caixa
      status: "Pendente", // Nasce pendente para o professor corrigir
      id_aluno: aluno.id,
      nome_aluno: aluno.nome_aluno,
      id_turma: idTurma, // Vincula à turma certa sem precisar de backend!
      data_entrega: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    };

    try {
      // Salva direto na tabela de redações do JSON Server
      await fetch('http://localhost:5000/tb_redacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaRedacao)
      });

      alert("Redação enviada com sucesso para o professor!");
      navigate(-1); // Volta para a tela de detalhes da sala do aluno
    } catch (error) {
      alert("Houve um erro ao enviar sua redação.");
    }
  };

  return (
    <div className="envio-container">
      {/* Header */}
      <header className="mentor-header">
        <div className="mentor-logo">
          <i className="fas fa-graduation-cap"></i> MentorIA
        </div>
        <nav className="mentor-nav">
          <ul>
            <li><button onClick={() => navigate('/dashboard-aluno')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>Dashboard</button></li>
            <li><span className="active" style={{ cursor: 'pointer' }}>Minhas redações</span></li>
          </ul>
        </nav>
        <div className="mentor-profile">
          <img src={`https://ui-avatars.com/api/?name=${aluno?.nome_aluno || 'Estudante'}&background=random`} alt="User" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mentor-main">
        <section className="editor-section">
          <h1 className="title">envie sua redação</h1>
          <p className="subtitle">Escreva ou cole sua redação abaixo para obter feedback do professor.</p>

          <div className="editor-card">
            <div className="editor-toolbar">
              <div className="tools-left">
                <i className="fas fa-bold"></i>
                <i className="fas fa-italic"></i>
                <i className="fas fa-underline"></i>
                <span className="separator">|</span>
                <i className="fas fa-list-ul"></i>
                <i className="fas fa-list-ol"></i>
                <span className="separator">|</span>
                <i className="fas fa-link"></i>
              </div>
              <div className="tools-right">
                <i className="fas fa-undo"></i>
                <i className="fas fa-redo"></i>
              </div>
            </div>
            
            <textarea 
              className="editor-input" 
              placeholder="Comece a digitar sua redação aqui..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />

            <div className="editor-footer">
              <span>{wordCount} palavras</span>
              <span>{saveStatus}</span>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>cancelar</button>
            {/* ADICIONADO: Função lidarComEnvio no clique do botão */}
            <button className="btn btn-primary" onClick={lidarComEnvio}>
              <i className="fas fa-paper-plane"></i> Enviar para revisão
            </button>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="mentor-sidebar">
          <div className="card-sidebar">
            <h3><i className="fas fa-tasks"></i> Diretrizes de Envio</h3>
            <ul className="guidelines">
              <li><i className="fas fa-check-circle"></i> Certifique-se de que sua redação aborde diretamente o tema atribuído.</li>
              <li><i className="fas fa-check-circle"></i> Contagem mínima de palavras: 500. Máxima: 2000.</li>
              <li><i className="fas fa-check-circle"></i> Revise por erros ortográficos e gramaticais antes de enviar.</li>
              <li><i className="fas fa-check-circle"></i> Inclua uma declaração de tese clara e concisa em sua introdução.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default EnvioRedacao;