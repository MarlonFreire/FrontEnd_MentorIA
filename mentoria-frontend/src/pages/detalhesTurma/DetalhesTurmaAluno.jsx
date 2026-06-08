import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalhesTurma.css';

function DetalhesTurmaAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState(null);
  const [redacoes, setRedacoes] = useState([]); // Nova lista para guardar as redações do banco

  useEffect(() => {
    // 1. Busca os dados da turma
    fetch(`http://localhost:5000/tb_turmas/${id}`)
      .then(res => res.json())
      .then(dados => setTurma(dados));

    // 2. Busca as redações enviadas por ESSE aluno NESTA turma
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      // Primeiro buscamos o id_aluno real correspondente ao usuário logado
      fetch(`http://localhost:5000/tb_alunos?id_usuario=${userLogado.id}`)
        .then(res => res.json())
        .then(alunos => {
          if (alunos.length > 0) {
            const alunoReal = alunos[0];
            // Agora filtramos as redações por aluno e por turma
            fetch(`http://localhost:5000/tb_redacoes?id_aluno=${alunoReal.id}&id_turma=${id}`)
              .then(res => res.json())
              .then(listaRedacoes => setRedacoes(listaRedacoes));
          }
        });
    }
  }, [id]);

  if (!turma) return <div className="carregando">Entrando na sala...</div>;

  return (
    <div className="detalhes-container">
      <header className="header-turma">
        <div className="logo">Mentor<span>IA</span></div>
        <button className="btn-voltar-fixo" onClick={() => navigate(-1)}>← Voltar</button>
      </header>

      <div className="banner-turma">
        <div className="banner-info">
          <h1>{turma.nome_turma}</h1>
          <p>{turma.serie}</p>
          <span>Redação • correções</span>
        </div>
      </div>

      <div className="conteudo-turma">
        <div className="secao-titulo">
          <h2>🖋️ Minhas Redações ({redacoes.length})</h2>
          <button className="btn-enviar" onClick={() => navigate(`/enviar-redacao/${id}`)}>
            + Escrever Redação
          </button>
        </div>

        {/* LÓGICA DE EXIBIÇÃO DINÂMICA */}
        {redacoes.length === 0 ? (
          <div className="lista-vazia">
            <span className="icone-doc">📄</span>
            <p>Nenhuma redação enviada ainda.</p>
            <p className="subtexto">Comece agora mesmo a praticar sua escrita.</p>
            <button className="btn-primeira-redacao" onClick={() => navigate(`/enviar-redacao/${id}`)}>
              Escrever primeira redação
            </button>
          </div>
        ) : (
          <div className="grid-redacoes-aluno" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {redacoes.map(red => (
              <div key={red.id} className="card-redacao-item" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'span-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#1e293b' }}>{red.tema}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Enviado em: {red.data_entrega}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span className={`status-badge ${red.status.toLowerCase()}`} style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', background: red.status === 'Corrigida' ? '#dcfce7' : '#fef9c3', color: red.status === 'Corrigida' ? '#166534' : '#854d0e' }}>
                    {red.status}
                  </span>
                  <button 
                    onClick={() => navigate(`/ver-redacao/${red.id}`)} 
                    style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Visualizar
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

export default DetalhesTurmaAluno;