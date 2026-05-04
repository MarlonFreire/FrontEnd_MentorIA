import React, { useState, useEffect } from 'react';
import './dashboardProfessor.css';

function DashboardProfessor() {
  const [turmas, setTurmas] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [nomeTurma, setNomeTurma] = useState('');
  const [serie, setSerie] = useState('');

  const carregarDados = async () => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      const respProf = await fetch(`http://localhost:5000/tb_professores?id_usuario=${userLogado.id}`);
      const dadosProf = await respProf.json();
      if (dadosProf.length > 0) setProfessor(dadosProf[0]);

      const respTurmas = await fetch(`http://localhost:5000/tb_turmas?id_professor=${dadosProf[0].id}`);
      const dadosTurmas = await respTurmas.json();
      setTurmas(dadosTurmas);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const criarTurma = async (e) => {
    e.preventDefault();
    const novaTurma = {
      nome_turma: nomeTurma,
      serie: serie,
      codigo_turma: Math.random().toString(36).substring(2, 10).toUpperCase(),
      id_professor: professor.id,
      alunos_cont: 0,
      redacoes_total: 0,
      redacoes_pendentes: 0
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

  // --- NOVA FUNÇÃO: EXCLUIR TURMA ---
  const excluirTurma = async (id) => {
    if (window.confirm("Atenção: Ao excluir esta turma, todos os dados vinculados a ela serão perdidos. Deseja continuar?")) {
      try {
        await fetch(`http://localhost:5000/tb_turmas/${id}`, {
          method: 'DELETE'
        });
        // Atualiza a lista local removendo a turma deletada
        setTurmas(turmas.filter(t => t.id !== id));
      } catch (error) {
        alert("Erro ao excluir a turma.");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar-larga">
        <div className="sidebar-header">
          <h2>Mentor<span>IA</span></h2>
        </div>
        
        <div className="usuario-info">
          <div className="avatar-grande">{professor?.nome_professor.charAt(0)}</div>
          <div className="texto-usuario">
            <strong>{professor?.nome_professor}</strong>
            <span>Professor(a)</span>
          </div>
        </div>

        <nav className="menu-lateral">
          <button className="item-menu ativo">👥 Minhas Turmas</button>
          <button className="item-menu">📄 Redações</button>
        </nav>

        <button className="btn-nova-turma" onClick={() => setModalAberto(true)}>
          + Nova Turma
        </button>
      </aside>

      <main className="conteudo-principal">
        <header className="topo-dashboard">
          <h1>Visão Geral</h1>
        </header>

        <div className="cards-resumo">
          <div className="card-mini">
            <span>Total de Redações</span>
            <strong>{turmas.reduce((acc, t) => acc + (t.redacoes_total || 0), 0)}</strong>
          </div>
          <div className="card-mini alerta">
            <span>Pendentes</span>
            <strong>{turmas.reduce((acc, t) => acc + (t.redacoes_pendentes || 0), 0)}</strong>
          </div>
          <div className="card-mini sucesso">
            <span>Corrigidas</span>
            <strong>{turmas.reduce((acc, t) => acc + ((t.redacoes_total - t.redacoes_pendentes) || 0), 0)}</strong>
          </div>
        </div>

        <div className="grid-turmas">
          {turmas.map((t) => (
            <div key={t.id} className="card-sala">
              <div className="card-sala-topo">
                <h3>{t.nome_turma}</h3>
                <p>{t.serie}</p>
              </div>
              <div className="card-sala-footer">
                <div className="info-box">
                  <div className="info-badge">Código: <strong>{t.codigo_turma}</strong></div>
                  <div className="info-badge">Alunos: <strong>{t.alunos_cont}</strong></div>
                </div>
                {/* BOTÃO DE LIXEIRA NO FOOTER */}
                <button 
                  className="btn-excluir-turma" 
                  onClick={() => excluirTurma(t.id)}
                  title="Excluir turma"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalAberto && (
        <div className="modal-fix-overlay">
          <div className="modal-fix-card">
            <h2>Criar Nova Turma</h2>
            <form onSubmit={criarTurma}>
              <div className="input-grupo">
                <label>Nome da Turma</label>
                <input type="text" placeholder="Ex: 3º Ano A" value={nomeTurma} onChange={e => setNomeTurma(e.target.value)} required />
              </div>
              <div className="input-grupo">
                <label>Série / Ano</label>
                <input type="text" placeholder="Ex: Ensino Médio" value={serie} onChange={e => setSerie(e.target.value)} required />
              </div>
              <div className="modal-botoes">
                <button type="button" className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button type="submit" className="btn-salvar">Criar Turma</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardProfessor;