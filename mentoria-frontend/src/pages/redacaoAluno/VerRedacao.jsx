import React, { useState } from 'react';
import './VerRedacao.css';

const VerRedacao = () => {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="ver-container">

      {/* HEADER */}
      <header className="mentor-header">
        <div className="mentor-logo">MentorIA</div>

        <nav className="mentor-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#essays" className="active">Redações</a></li>
          </ul>
        </nav>

        <div className="mentor-profile">
          <img 
            src="https://ui-avatars.com/api/?name=User&background=random" 
            alt="User" 
          />
        </div>
      </header>

      {/* MAIN */}
      <main className="ver-main">

        {/* TEXTO */}
        <section className="ver-content">
          <h1>Desafios enfrentados por pessoas com doenças raras no Brasil</h1>
          <p className="sub">Enviada em Out 12, 2023</p>

          <p className="text">
            A Constituição Federal de 1988,
            <span className="highlight-red"> assegura o direito à saúde como um dever do Estado </span>,
            No entanto, essa garantia ainda encontra obstáculos significativos quando se trata de pessoas com doenças raras no Brasil.
          </p>

          <div className="highlight-blue">
            Essas condições, que afetam uma pequena parcela da população individualmente, somam milhões de brasileiros quando consideradas em conjunto, revelando um cenário marcado por dificuldades no diagnóstico, acesso ao tratamento e inclusão social.          </div>

          <p className="text">
            Um dos principais desafios enfrentados por essas pessoas é a demora no diagnóstico.
            <span className="highlight-orange"> evido à baixa incidência e à limitada formação de profissionais de saúde sobre o tema, </span>.
          </p>

          <p className="text">
            muitos pacientes passam anos em busca de respostas, enfrentando uma verdadeira “via-crúcis” médica.
          </p>
        </section>

        {/* SIDEBAR */}
        <aside className="ver-sidebar">

          <div className="tabs">
            <span 
              className={activeTab === 'ai' ? 'active' : ''}
              onClick={() => setActiveTab('ai')}
            >
              comentários do professor
            </span>
          </div>

          <div className={`card red ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>Gramatica e sintaxe</h3>
            <small>2 erros</small>
            <p>"assegura o direito à saúde como um dever do Estado " → verbo incorreto</p>
          </div>

          <div className={`card blue ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>estrutura & coerencia</h3>
            <small>1 anotação</small>
            <p>Uma transição de parágrafos bem estruturada poderia melhorar a clareza..</p>
          </div>

          <div className={`card yellow ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>Citação e fatos</h3>
            <small>1 melhoria</small>
            <p>Adicione uma referência</p>
          </div>

        </aside>
      </main>
    </div>
  );
};

export default VerRedacao;