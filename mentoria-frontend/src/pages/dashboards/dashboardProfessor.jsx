import React, { useState } from 'react';
import './dashboardProfessor.css';
import imagemProfessora from '../../imagens/MentorIA.png'; // Use a foto da Sarah aqui se tiver

function DashboardProfessor() {
  // 1. Estado das turmas
  const [turmas, setTurmas] = useState([
    { id: 1, nome: '3º Ano A', disciplina: 'Redação', codigo: 'EC3F1E30', alunos: 32, redacoes: 12, cor: '#1a73e8' },
    { id: 2, nome: '2º Ano B', disciplina: 'Literatura', codigo: 'FF2A1C90', alunos: 28, redacoes: 8, cor: '#00c48c' }
  ]);

  
  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novaDisciplina, setNovaDisciplina] = useState('');

  const gerarCodigoUnico = () => Math.random().toString(36).substring(2, 10).toUpperCase();

  const criarTurma = (e) => {
    e.preventDefault();
    const novaTurma = {
      id: Date.now(),
      nome: novoNome,
      disciplina: novaDisciplina,
      codigo: gerarCodigoUnico(),
      alunos: 0,
      redacoes: 0,
      cor: '#4d7cfe' 
    };
    setTurmas([...turmas, novaTurma]);
    setModalAberto(false);
    setNovoNome('');
    setNovaDisciplina('');
  };

  return (
    <div className="dashboard-layout">
      
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Mentor<span>IA</span></h2>
        </div>

        <div className="sidebar-perfil">
          <div className="avatar-circulo">S</div>
          <div className="perfil-info">
            <strong>Sarah Jenkins</strong>
            <span>Professora de redação</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item"><i>🏠</i> Início</button>
          <button className="nav-item ativo"><i>👥</i> Minhas turmas</button>
        </nav>

        <button className="botao-nova-turma-sidebar" onClick={() => setModalAberto(true)}>
          + Nova turma
        </button>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="busca-bar">
            <input type="text" placeholder="Buscar turmas, alunos..." />
          </div>
          <div className="header-icons">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⚙️</button>
            <div className="perfil-mini">S</div>
          </div>
        </header>

        <section className="welcome-section">
          <h1>Bem vindo de volta!</h1>
          <p>Segue abaixo uma visão geral das turmas</p>
        </section>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Média das Redações</span>
            <h2>85/100 <small>+5%</small></h2>
          </div>
          <div className="stat-card">
            <span>Tempo de IA</span>
            <h2>1.2s <small>-0.3s</small></h2>
          </div>
          <div className="stat-card">
            <span>Revisões Pendentes</span>
            <h2>12 <small className="alert">Ação necessária</small></h2>
          </div>
        </div>

        <div className="turmas-header">
          <h2>Suas Turmas</h2>
        </div>

      
        <div className="grid-turmas">
          {turmas.map((turma) => (
            <div key={turma.id} className="card-turma">
              <div className="card-topo" style={{ backgroundColor: turma.cor }}>
                <div className="card-info">
                  <h3>{turma.nome}</h3>
                  <p>{turma.disciplina}</p>
                </div>
                <button className="btn-opcoes">⋮</button>
              </div>
              <div className="card-corpo">
                <div className="codigo-box">
                  <small>CÓDIGO</small>
                  <strong>{turma.codigo}</strong>
                </div>
              </div>
              <div className="card-footer">
                <span>👥 {turma.alunos}</span>
                <span>📄 {turma.redacoes}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      
{modalAberto && (
  <div className="modal-overlay">
    <div className="modal-container modal-content"> 
      <div className="modal-header">
        <h3>Criar Nova Turma</h3>
        <button className="botao-fechar-modal" onClick={() => setModalAberto(false)}>&times;</button>
      </div>
      
      {/* Classe para os inputs: formulario-modal-turma */}
      <form onSubmit={criarTurma} className="formulario-modal-turma">
        <div className="campo-input">
          <label>Nome da Turma</label>
          <input type="text" placeholder="Ex: 3º Ano Ensino Médio" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
        </div>

        <div className="campo-input">
          <label>Disciplina</label>
          <input type="text" placeholder="Ex: Redação / Literatura" value={novaDisciplina} onChange={(e) => setNovaDisciplina(e.target.value)} required />
        </div>

        <div className="modal-actions">
          <button type="button" className="botao-cancelar-modal" onClick={() => setModalAberto(false)}>Cancelar</button>
          <button type="submit" className="botao-confirmar-modal">Criar Turma</button>
        </div>
      </form>
    </div>
  </div>
    )}
    </div>
  );
}

export default DashboardProfessor;