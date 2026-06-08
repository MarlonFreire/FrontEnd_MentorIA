import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./detalhesTurma.css";

function DetalhesTurmaProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);
  const [redacoes, setRedacoes] = useState([]); // Nova lista para as redações da turma
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // 1. Busca os dados da turma
    fetch(`http://localhost:5000/tb_turmas/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Turma não encontrada");
        return res.json();
      })
      .then(dados => {
        setTurma(dados);
        
        // 2. Busca TODAS as redações que pertencem a ESTA turma
        return fetch(`http://localhost:5000/tb_redacoes?id_turma=${id}`);
      })
      .then(res => res.json())
      .then(listaRedacoes => {
        setRedacoes(listaRedacoes);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return <div className="carregando" style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>Carregando dados da turma...</div>;
  }

  if (!turma) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Erro: Turma não encontrada!</h2>
        <button onClick={() => navigate(-1)}>Voltar ao Dashboard</button>
      </div>
    );
  }

  // Filtra quantas ainda precisam de correção
  const pendentes = redacoes.filter(r => r.status === 'Pendente').length;

  return (
    <div className="detalhes-container">
      <header className="header-turma">
        <div className="logo">Mentor<span>IA</span></div>
        <button className="btn-voltar-fixo" onClick={() => navigate(-1)}>← Voltar</button>
      </header>

      <div className="banner-turma">
        <div className="banner-info">
          <h1>{turma.nome_turma || "Sem nome"}</h1>
          <p>{turma.serie || "Sem série"}</p>
          <span>Redação • correções</span>
        </div>
        <div className="codigo-destaque">
          <span>CÓDIGO DA TURMA</span>
          <strong>{turma.codigo_turma || "N/A"}</strong>
        </div>
      </div>

      <div className="conteudo-turma">
        <div className="tabs-selecao">
          <button className="tab ativo">Redações ({redacoes.length})</button>
          <button className="tab">Alunos ({turma.alunos_cont || 0})</button>
        </div>

        {/* LISTAGEM DINÂMICA DE REDAÇÕES PARA O PROFESSOR */}
        {redacoes.length === 0 ? (
          <div className="lista-vazia">
            <span className="icone-doc">📄</span>
            <p>Nenhuma redação enviada ainda por esta turma.</p>
          </div>
        ) : (
          <div className="lista-redacoes-professor" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {redacoes.map(red => (
              <div key={red.id} className="card-redacao-item" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#1e293b' }}>{red.tema}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Aluno: <strong>{red.nome_aluno}</strong> • Enviado em: {red.data_entrega}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '13px', 
                    fontWeight: 'bold', 
                    background: red.status === 'Corrigida' ? '#dcfce7' : '#fef9c3', 
                    color: red.status === 'Corrigida' ? '#166534' : '#854d0e' 
                  }}>
                    {red.status}
                  </span>
                  
                  {/* Botão que leva para a tela de correção que criamos */}
                  <button 
                    onClick={() => navigate(`/corrigir-redacao/${red.id}`)} 
                    style={{ 
                      padding: '8px 16px', 
                      borderRadius: '8px', 
                      border: 'none', 
                      background: red.status === 'Corrigida' ? '#64748b' : '#2563eb', 
                      color: 'white',
                      cursor: 'pointer', 
                      fontWeight: '500' 
                    }}
                  >
                    {red.status === 'Corrigida' ? 'Ver Correção' : 'Corrigir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalhesTurmaProfessor;