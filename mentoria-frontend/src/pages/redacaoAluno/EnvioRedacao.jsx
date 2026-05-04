import React, { useState, useEffect } from 'react';
import './EnvioRedacao.css';

const EnvioRedacao = () => {
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState('Draft saved: Just now');

  // Atualiza o contador de palavras e simula o salvamento
  useEffect(() => {
    const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
    setWordCount(words);

    if (essay.length > 0) {
      setSaveStatus('Saving...');
      const timer = setTimeout(() => {
        setSaveStatus('Draft saved: Just now');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [essay]);

  return (
    <div className="envio-container">
      {/* Header */}
      <header className="mentor-header">
        <div className="mentor-logo">
          <i className="fas fa-graduation-cap"></i> MentorIA
        </div>
        <nav className="mentor-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#essays" className="active">Minhas redações</a></li>
            <li><a href="#settings">configuração</a></li>
          </ul>
        </nav>
        <div className="mentor-profile">
          <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mentor-main">
        <section className="editor-section">
          <h1 className="title">envie sua redação</h1>
          <p className="subtitle">Escreva ou cole sua redação abaixo para obter feedback do IA e do professor.</p>

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
              placeholder="Start typing your essay here..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />

            <div className="editor-footer">
              <span>{wordCount} words</span>
              <span>{saveStatus}</span>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-secondary">salvar rascunho</button>
            <button className="btn btn-primary">
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

          <div className="card-sidebar ai-card">
            <h3 className="ai-title"><i className="far fa-lightbulb"></i> Dicas rápidas da IA</h3>
            <p>ONossa IA sugere que você se concentre em palavras de transição fortes entre os parágrafos para melhorar a fluidez de seus argumentos.</p>
            <div className="ai-quote">
              "Tente usar palavras como 'Além disso', 'no entanto' ou 'consequentemente' para conectar ideias complexas."
            </div>
            <button className="ai-action-btn">
              <i className="fas fa-wand-magic-sparkles"></i> Execute a pré-verificação de IA
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default EnvioRedacao;