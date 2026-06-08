import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VerRedacao.css';

const VerRedacao = () => {
  const { idRedacao } = useParams(); 
  const navigate = useNavigate();
  
  const [redacao, setRedacao] = useState(null);
  const [correcao, setCorrecao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Busca a redação que o aluno enviou
    fetch(`http://localhost:5000/tb_redacoes/${idRedacao}`)
      .then(res => res.json())
      .then(dadosRedacao => {
        setRedacao(dadosRedacao);
        
        // Busca a correção feita pelo professor para esta redação
        return fetch(`http://localhost:5000/tb_correcao?id_redacao=${idRedacao}`);
      })
      .then(res => res.json())
      .then(dadosCorrecao => {
        if (dadosCorrecao.length > 0) {
          setCorrecao(dadosCorrecao[0]);
        }
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados da correção:", err);
        setCarregando(false);
      });
  }, [idRedacao]);

  if (carregando) return <div className="carregando-aviso">Carregando sua correção...</div>;
  if (!redacao) return <div className="erro-aviso">Redação não encontrada.</div>;

  return (
    <div className="visualizar-redacao-tela">
      {/* Topo da Página */}
      <header className="mentor-header">
        <div className="mentor-logo">Mentor<span>IA</span></div>
        <button className="btn-voltar-turma" onClick={() => navigate(-1)}>
          ← Voltar para a Turma
        </button>
      </header>

      {/* Área Principal */}
      <main className="painel-conteudo">
        
        {/* Lado Esquerdo: Texto da Redação */}
        <section className="secao-texto-aluno">
          <h1 className="tema-titulo">{redacao.tema}</h1>
          <p className="data-envio">Enviado em: {redacao.data_entrega}</p>
          
          <div className="caixa-texto-real">
            {redacao.texto}
          </div>
        </section>

        {/* Lado Direito: Caixa de Notas e Comentários */}
        <aside className="barra-lateral-feedback">
          
          {/* Card com a Nota */}
          <div className="card-nota-final">
            <h3>Sua Nota Final</h3>
            <span className="numero-nota">
              {correcao ? correcao.nota : "---"}
            </span>
            <p className="subtexto-nota">Escala de 0 a 1000 pontos</p>
          </div>

          {/* Card com o Feedback de Texto */}
          <div className="card-comentario-professor">
            <h3>💬 Comentários do Professor</h3>
            
            {correcao ? (
              <div className="balao-comentario">
                {correcao.comentario}
              </div>
            ) : (
              <p className="sem-correcao">O professor ainda não digitou um feedback para esta entrega.</p>
            )}
          </div>

        </aside>
      </main>
    </div>
  );
};

export default VerRedacao;