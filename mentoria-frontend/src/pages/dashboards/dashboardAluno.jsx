import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante para a navegação
import './dashboardAluno.css';

function DashboardAluno() {
  const [turmas, setTurmas] = useState([]);
  const [aluno, setAluno] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [codigoBusca, setCodigoBusca] = useState('');
  
  const navigate = useNavigate(); // Inicializa a navegação

  const carregarDados = async () => {
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      const respA = await fetch(`http://localhost:5000/tb_alunos?id_usuario=${userLogado.id}`);
      const dadosA = await respA.json();
      
      if (dadosA.length > 0) {
        const alunoAtual = dadosA[0];
        setAluno(alunoAtual);
        
        const storageKey = `vinculos_aluno_${alunoAtual.id}`;
        const idsQueEuEntrei = JSON.parse(localStorage.getItem(storageKey)) || [];
        
        if (idsQueEuEntrei.length > 0) {
          const respT = await fetch(`http://localhost:5000/tb_turmas`);
          const todasAsTurmasDoBanco = await respT.json();
          
          const minhasTurmasFiltradas = todasAsTurmasDoBanco.filter(turma => 
            idsQueEuEntrei.includes(turma.id)
          );
          
          setTurmas(minhasTurmasFiltradas); 
        } else {
          setTurmas([]);
        }
      }
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const entrarNaTurma = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://localhost:5000/tb_turmas?codigo_turma=${codigoBusca.toUpperCase()}`);
      const resultado = await resp.json();

      if (resultado.length > 0) {
        const turmaEncontrada = resultado[0];
        const storageKey = `vinculos_aluno_${aluno.id}`;
        const idsAtuais = JSON.parse(localStorage.getItem(storageKey)) || [];

        if (!idsAtuais.includes(turmaEncontrada.id)) {
          const novosIds = [...idsAtuais, turmaEncontrada.id];
          localStorage.setItem(storageKey, JSON.stringify(novosIds));

          await fetch(`http://localhost:5000/tb_turmas/${turmaEncontrada.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alunos_cont: (turmaEncontrada.alunos_cont || 0) + 1 })
          });

          alert("Matrícula confirmada!");
          await carregarDados(); 
        } else {
          alert("Você já está nesta turma!");
        }
        setModalAberto(false);
        setCodigoBusca('');
      } else {
        alert("Código não encontrado!");
      }
    } catch (erro) {
      alert("Erro ao processar matrícula.");
    }
  };

  const sairDaTurma = async (e, idTurma) => {
    e.stopPropagation(); // Impede que abra a turma ao clicar para sair
    if (window.confirm("Deseja sair desta turma?")) {
      const storageKey = `vinculos_aluno_${aluno.id}`;
      const idsAtuais = JSON.parse(localStorage.getItem(storageKey)) || [];
      const novosIds = idsAtuais.filter(id => id !== idTurma);
      
      localStorage.setItem(storageKey, JSON.stringify(novosIds));
      
      const turmaAlvo = turmas.find(t => t.id === idTurma);
      await fetch(`http://localhost:5000/tb_turmas/${idTurma}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alunos_cont: Math.max(0, (turmaAlvo.alunos_cont || 1) - 1) })
      });

      carregarDados();
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar-larga">
        <div className="sidebar-header"><h2>Mentor<span>IA</span></h2></div>
        <div className="usuario-info">
          <div className="avatar-grande">{aluno?.nome_aluno?.charAt(0)}</div>
          <div className="texto-usuario">
            <strong>{aluno?.nome_aluno}</strong>
            <span>Estudante</span>
          </div>
        </div>
        <nav className="menu-lateral">
          <button className="item-menu ativo">🏠 Início</button>
          <button className="item-menu">📝 Minhas Redações</button>
        </nav>
        <button className="btn-nova-turma" onClick={() => setModalAberto(true)}>+ Entrar em Turma</button>
      </aside>

      <main className="conteudo-principal">
        <header className="topo-dashboard"><h1>Minhas Salas</h1></header>

        <div className="grid-turmas">
          {turmas.map(t => (
            <div 
              key={t.id} 
              className="card-sala-aluno" 
              onClick={() => navigate(`/turma-aluno/${t.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-sala-topo-aluno">
                <h3>{t.nome_turma}</h3>
                <p>{t.serie}</p>
              </div>
              <div className="card-sala-footer-aluno">
                <span>Atividades: {t.redacoes_total || 0}</span>
                <button 
                  className="btn-lixeira-aluno" 
                  onClick={(e) => sairDaTurma(e, t.id)}
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
            <h2>Entrar na Turma</h2>
            <form onSubmit={entrarNaTurma}>
              <div className="input-grupo">
                <input type="text" value={codigoBusca} onChange={e => setCodigoBusca(e.target.value)} placeholder="Código da sala" required />
              </div>
              <div className="modal-botoes">
                <button type="button" className="btn-cancelar" onClick={() => setModalAberto(false)}>Voltar</button>
                <button type="submit" className="btn-salvar-aluno">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAluno;