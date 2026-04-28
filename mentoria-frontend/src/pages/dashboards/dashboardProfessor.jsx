import React, { useState, useEffect } from 'react';
import './dashboardProfessor.css';

function DashboardProfessor() {
  const [turmas, setTurmas] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [nomeTurma, setNomeTurma] = useState('');
  const [serie, setSerie] = useState('');

  // 1. Carregar dados do Professor Logado e suas Turmas
  const carregarDados = async () => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (userLogado) {
      // Busca o perfil do professor vinculado ao id_usuario
      const respProf = await fetch(`http://localhost:5000/tb_professores?id_usuario=${userLogado.id}`);
      const dadosProf = await respProf.json();
      if (dadosProf.length > 0) setProfessor(dadosProf[0]);

      // Busca as turmas
      const respTurmas = await fetch(`http://localhost:5000/tb_turmas?id_professor=${dadosProf[0].id}`);
      const dadosTurmas = await respTurmas.json();
      setTurmas(dadosTurmas);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const gerarCodigoUnico = () => Math.random().toString(36).substring(2, 10).toUpperCase();

  const criarTurma = async (e) => {
    e.preventDefault();
    const novaTurma = {
      nome_turma: nomeTurma,
      serie: serie,
      codigo_turma: gerarCodigoUnico(),
      id_professor: professor.id // Vincula ao ID real do professor
    };

    await fetch('http://localhost:5000/tb_turmas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTurma)
    });

    setModalAberto(false);
    setNomeTurma('');
    setSerie('');
    carregarDados();
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo"><h2>Mentor<span>IA</span></h2></div>
        <div className="sidebar-perfil">
          <div className="avatar-circulo">{professor ? professor.nome_professor.charAt(0) : 'P'}</div>
          <div className="perfil-info">
            <strong>{professor ? professor.nome_professor : 'Carregando...'}</strong>
            <span>{professor ? professor.disciplina : 'Professor'}</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item ativo"><i>👥</i> Turmas</button>
        </nav>
        <button className="botao-nova-turma-sidebar" onClick={() => setModalAberto(true)}>+ Nova Turma</button>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Minhas Turmas Ativas</h1>
          <div className="perfil-mini">{professor ? professor.nome_professor.charAt(0) : ''}</div>
        </header>

        <div className="grid-turmas">
          {turmas.map((t) => (
            <div key={t.id} className="card-turma">
              <div className="card-topo" style={{ backgroundColor: '#1a73e8' }}>
                <h3>{t.nome_turma}</h3>
                <p>{t.serie}</p>
              </div>
              <div className="card-corpo">
                <div className="codigo-box">
                  <small>CÓDIGO DA SALA</small>
                  <strong>{t.codigo_turma}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Criar Nova Turma</h3>
              <button onClick={() => setModalAberto(false)}>&times;</button>
            </div>
            <form onSubmit={criarTurma} className="formulario-modal-turma">
              <div className="campo-input">
                <label>Nome (Ex: 3º Ano B)</label>
                <input type="text" value={nomeTurma} onChange={e => setNomeTurma(e.target.value)} required />
              </div>
              <div className="campo-input">
                <label>Série (Ex: Ensino Médio)</label>
                <input type="text" value={serie} onChange={e => setSerie(e.target.value)} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="botao-confirmar-modal">Criar no Banco</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardProfessor;