import React, { useState } from 'react';
import './dashboardAluno.css';

function DashboardAluno() {
  // 1. Estado das turmas em que o aluno já está matriculado
  const [turmas, setTurmas] = useState([
    { id: 1, nome: '3 ano ensino medio', disciplina: 'Redação', professor: 'João Silva', cor: '#8b5cf6', alunos: 1, redacoes: 1 }
  ]);

  // 2. Estados para o Modal de Participar
  const [modalAberto, setModalAberto] = useState(false);
  const [codigoInput, setCodigoInput] = useState('');

  // 3. Função para simular entrada na turma
  const entrarNaTurma = (e) => {
    e.preventDefault();
    
    // Aqui no futuro faremos a busca no banco pelo código
    console.log("Buscando turma com código:", codigoInput);
    
    // Simulação de nova turma adicionada
    const novaTurmaSimulada = {
      id: Date.now(),
      nome: 'Nova Turma Encontrada',
      disciplina: 'Português',
      professor: 'Prof. Exemplo',
      cor: '#3b82f6',
      alunos: 15,
      redacoes: 0
    };

    setTurmas([...turmas, novaTurmaSimulada]);
    setModalAberto(false);
    setCodigoInput('');
  };

  return (
    <div className="dashboard-layout">
      
      {/* SIDEBAR (Igual a do professor para manter o padrão) */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Mentor<span>IA</span></h2>
        </div>

        <div className="sidebar-perfil">
          <div className="avatar-circulo">A</div>
          <div className="perfil-info">
            <strong>Alice Oliveira</strong>
            <span>Aluno</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item ativo"><i>🏠</i> Início</button>
          <button className="nav-item"><i>📚</i> Minhas turmas</button>
          <button className="nav-item"><i>📝</i> Minhas redações</button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-texto">
            <h1>Minhas Turmas</h1>
            <p>Acesse suas turmas e envie redações.</p>
          </div>
          <button className="botao-participar-topo" onClick={() => setModalAberto(true)}>
            <span>+</span> Participar da Turma
          </button>
        </header>

        {/* GRID DE TURMAS */}
        <div className="grid-turmas">
          {turmas.map((turma) => (
            <div key={turma.id} className="card-turma-aluno">
              <div className="card-topo" style={{ backgroundColor: turma.cor }}>
                <h3>{turma.nome}</h3>
                <p>{turma.disciplina}</p>
                <div className="avatar-prof-card">{turma.professor.charAt(0)}</div>
              </div>
              <div className="card-corpo">
                <p className="nome-professor">🎓 {turma.professor}</p>
                <hr />
                <div className="stats-card-aluno">
                  <span>👥 {turma.alunos}</span>
                  <span>📄 {turma.redacoes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE PARTICIPAR */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Participar de uma Turma</h3>
              <button className="botao-fechar" onClick={() => setModalAberto(false)}>&times;</button>
            </div>
            <p className="modal-subtitulo">Peça o código da turma para o seu professor e digite-o abaixo.</p>
            
            <form onSubmit={entrarNaTurma} className="form-participar">
              <label>Código da Turma</label>
              <input 
                type="text" 
                placeholder="EX: X7Y9Z" 
                value={codigoInput}
                onChange={(e) => setCodigoInput(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="btn-participar-confirmar">Participar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAluno;