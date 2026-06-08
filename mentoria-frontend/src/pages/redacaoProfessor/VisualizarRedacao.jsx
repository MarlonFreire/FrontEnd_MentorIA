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

  useEffect(() => {
    // 1. Carrega os dados do professor logado
    const userLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (userLogado) {
      fetch(`http://localhost:5000/tb_professores?id_usuario=${userLogado.id}`)
        .then(res => res.json())
        .then(dados => { if (dados.length > 0) setProfessor(dados[0]); });
    }

    // 2. Carrega a redação específica que foi clicada
    fetch(`http://localhost:5000/tb_redacoes/${idRedacao}`)
      .then(res => res.json())
      .then(dados => setRedacao(dados));
  }, [idRedacao]);

  const finalizarCorrecao = async (e) => {
    e.preventDefault();

    if (!professor) {
      alert("Erro: Professor não identificado.");
      return;
    }

    // Estrutura batendo certinho com a sua tabela 'tb_correcao'
    const novaCorrecao = {
      id_redacao: parseInt(idRedacao),
      id_professor: professor.id,
      nota: parseFloat(nota),
      comentario: comentario,
      data_correcao: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
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
      navigate(-1); // Volta para a tela anterior
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
        {/* LADO ESQUERDO: Texto do Aluno (Apenas Leitura) */}
        <section className="bloco-leitura">
          <div className="info-redacao-topo">
            <h1>{redacao.tema}</h1>
            <span>Enviado por: <strong>{redacao.nome_aluno}</strong></span>
          </div>
          <div className="texto-do-aluno">
            {/* O texto digitado pelo aluno fica aqui dentro */}
            <p>{redacao.texto}</p>
          </div>
        </section>

        {/* LADO DIREITO: Formulário de Correção do Professor */}
        <section className="bloco-formulario">
          <h2>Avaliação Humana</h2>
          <form onSubmit={finalizarCorrecao}>
            <div className="campo-grupo">
              <label>Nota da Redação (0 a 1000)</label>
              <input 
                type="number" 
                min="0" 
                max="1000" 
                step="50"
                placeholder="Ex: 850" 
                value={nota}
                onChange={e => setNota(e.target.value)}
                required 
              />
            </div>

            <div className="campo-grupo">
              <label>Comentários e Feedbacks Pedagógicos</label>
              <textarea 
                rows="10" 
                placeholder="Digite aqui os pontos fortes e o que o aluno precisa melhorar..."
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-finalizar-enviar">
              Concluir e Enviar Correção
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default VisualizarRedacao;