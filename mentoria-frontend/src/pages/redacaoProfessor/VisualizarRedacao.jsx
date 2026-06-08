import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './visualizarRedacao.css'; 

function VisualizarRedacao() {
  const { idRedacao } = useParams(); // Pega o ID da redação pela URL
  const navigate = useNavigate();
  
  const [redacao, setRedacao] = useState(null);
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [professor, setProfessor] = useState(null);
  const [jaCorrigida, setJaCorrigida] = useState(false);

  useEffect(() => {
    // 1. Carrega os dados do professor logado
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      fetch(`http://localhost:5000/tb_professores?id_usuario=${userLogado.id}`)
        .then(res => res.json())
        .then(dados => { if (dados.length > 0) setProfessor(dados[0]); });
    }

    // 2. Carrega a redação específica
    fetch(`http://localhost:5000/tb_redacoes/${idRedacao}`)
      .then(res => res.json())
      .then(dados => {
        setRedacao(dados);
        
        // Se o status já for Corrigida, busca a correção existente no banco
        if (dados.status === 'Corrigida') {
          setJaCorrigida(true);
          fetch(`http://localhost:5000/tb_correcao?id_redacao=${idRedacao}`)
            .then(res => res.json())
            .then(correcoes => {
              if (correcoes.length > 0) {
                setNota(correcoes[0].nota);
                setComentario(correcoes[0].comentario);
              }
            });
        }
      });
  }, [idRedacao]);

  const finalizarCorrecao = async (e) => {
    e.preventDefault();

    if (!professor) {
      alert("Erro: Professor não identificado.");
      return;
    }

    const novaCorrecao = {
      id_redacao: idRedacao, 
      id_professor: professor.id,
      nota: parseFloat(nota),
      comentario: comentario,
      data_correcao: new Date().toISOString().split('T')[0]
    };

    try {
      // 1. Salva a correção no banco
      await fetch('http://localhost:5000/tb_correcao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCorrecao)
      });

      // 2. Atualiza o status da redação original para "Corrigida"
      await fetch(`http://localhost:5000/tb_redacoes/${idRedacao}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Corrigida' })
      });

      alert("Redação corrigida com sucesso!");
      navigate(-1);
    } catch (error) {
      alert("Erro ao salvar correção.");
    }
  };

  if (!redacao) return <div className="carregando">Carregando redação...</div>;

  return (
    <div className="correcao-container">
      <header className="header-correcao">
        <h2>Mentor<span>IA</span> - Área de Correção</h2>
        <button className="btn-voltar" onClick={() => navigate(-1)}>Voltar</button>
      </header>

      <main className="painel-duplo">
        {/* LADO ESQUERDO: Texto do Aluno */}
        <section className="bloco-leitura">
          <div className="info-redacao-topo">
            <h1>{redacao.tema}</h1>
            <span>Enviado por: <strong>{redacao.nome_aluno}</strong></span>
          </div>
          <div className="texto-do-aluno">
            <p>{redacao.texto}</p>
          </div>
        </section>

        {/* LADO DIREITO: Formulário ou Visualização fixa */}
        <section className="bloco-formulario">
          <h2>{jaCorrigida ? "Avaliação Concluída" : "Avaliação Humana"}</h2>
          <form onSubmit={finalizarCorrecao}>
            <div className="campo-grupo">
              <label>Nota da Redação (0 a 1000)</label>
              <input 
                type="number" 
                placeholder="Ex: 850" 
                value={nota}
                onChange={e => setNota(e.target.value)}
                disabled={jaCorrigida} /* Bloqueia o campo se já estiver corrigido */
                required 
              />
            </div>

            <div className="campo-grupo">
              <label>Comentários e Feedbacks Pedagógicos</label>
              <textarea 
                rows="10" 
                placeholder="Digite os feedbacks..."
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                disabled={jaCorrigida} /* Bloqueia o campo se já estiver corrigido */
                required
              ></textarea>
            </div>

            {/* Remove ou desabilita o botão se já foi enviado */}
            {!jaCorrigida ? (
              <button type="submit" className="btn-finalizar-enviar">
                Concluir e Enviar Correção
              </button>
            ) : (
              <div style={{ textAlign: 'center', color: '#16a34a', fontWeight: 'bold', padding: '15px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                ✓ Esta redação já foi avaliada e enviada ao aluno.
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default VisualizarRedacao;