import React, { useState, useEffect } from 'react';
import './dashboardAluno.css';

function DashboardAluno() {
  const [turmas, setTurmas] = useState([]);
  const [aluno, setAluno] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [codigoBusca, setCodigoBusca] = useState('');

  const carregarDadosAluno = async () => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (userLogado) {
      // 1. Busca perfil do aluno
      const respAluno = await fetch(`http://localhost:5000/tb_alunos?id_usuario=${userLogado.id}`);
      const dadosAluno = await respAluno.json();
      if (dadosAluno.length > 0) setAluno(dadosAluno[0]);

      // 2. Busca IDs das turmas vinculadas no localStorage deste aluno específico
      const storageKey = `vinculos_aluno_${dadosAluno[0].id}`;
      const vinculos = JSON.parse(localStorage.getItem(storageKey)) || [];
      
      if (vinculos.length > 0) {
        const query = vinculos.map(id => `id=${id}`).join('&');
        const respTurmas = await fetch(`http://localhost:5000/tb_turmas?${query}`);
        const turmasData = await respTurmas.json();
        setTurmas(turmasData);
      }
    }
  };

  useEffect(() => { carregarDadosAluno(); }, []);

  const participarDaTurma = async (e) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:5000/tb_turmas?codigo_turma=${codigoBusca.toUpperCase()}`);
    const resultado = await resp.json();

    if (resultado.length > 0) {
      const turmaEncontrada = resultado[0];
      const storageKey = `vinculos_aluno_${aluno.id}`;
      const idsAtuais = JSON.parse(localStorage.getItem(storageKey)) || [];

      if (!idsAtuais.includes(turmaEncontrada.id)) {
        const novosIds = [...idsAtuais, turmaEncontrada.id];
        localStorage.setItem(storageKey, JSON.stringify(novosIds));
        alert("Matrícula realizada com sucesso!");
        carregarDadosAluno();
      } else {
        alert("Você já está nesta turma.");
      }
      setModalAberto(false);
      setCodigoBusca('');
    } else {
      alert("Código da tb_turmas não encontrado.");
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo"><h2>Mentor<span>IA</span></h2></div>
        <div className="sidebar-perfil">
          <div className="avatar-circulo">{aluno ? aluno.nome_aluno.charAt(0) : 'A'}</div>
          <div className="perfil-info">
            <strong>{aluno ? aluno.nome_aluno : 'Carregando...'}</strong>
            <span>{aluno ? `Matrícula: ${aluno.matricula}` : 'Estudante'}</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item ativo">🏠 Minhas Turmas</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Área do Estudante</h1>
          <button className="botao-participar-topo" onClick={() => setModalAberto(true)}>
            + Entrar em Turma
          </button>
        </header>

        <div className="grid-turmas">
          {turmas.length === 0 ? (
            <p className="msg-vazia">Nenhuma turma vinculada ao seu perfil.</p>
          ) : (
            turmas.map((t) => (
              <div key={t.id} className="card-turma-aluno">
                <div className="card-topo" style={{ backgroundColor: '#8b5cf6' }}>
                  <h3>{t.nome_turma}</h3>
                  <p>{t.serie}</p>
                </div>
                <div className="card-corpo">
                  <p>✅ Conectado à tb_turmas</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Participar (tb_turmas)</h3>
            <form onSubmit={participarDaTurma}>
              <div className="campo-input">
                <label>Código Gerado pelo Professor</label>
                <input type="text" value={codigoBusca} onChange={e => setCodigoBusca(e.target.value)} required />
              </div>
              <button type="submit" className="botao-confirmar-modal">Validar Matrícula</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAluno;