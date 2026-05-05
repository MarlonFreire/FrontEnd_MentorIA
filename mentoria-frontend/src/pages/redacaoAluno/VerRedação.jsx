import React, { useState } from 'react';
import './VerRedação.css';

const VerRedação = () => {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="ver-container">

      {/* HEADER (reaproveitável no projeto) */}
      <header className="mentor-header">
        <div className="mentor-logo">MentorIA</div>

        <nav className="mentor-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#essays" className="active">Redações</a></li>
            <li><a href="#settings">Configuração</a></li>
          </ul>
        </nav>

        <div className="mentor-profile">
          <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
        </div>
      </header>

      {/* MAIN */}
      <main className="ver-main">

        {/* TEXTO */}
        <section className="ver-content">
          <h1>History Midterm: The Causes of the French Revolution</h1>
          <p className="sub">Submitted on Oct 12, 2023</p>

          <p className="text">
            The French Revolution,
            <span className="highlight-red"> which beginning in 1789 </span>,
            was a period of radical social and political upheaval in France.
          </p>

          <div className="highlight-blue">
            The country was deeply in debt, largely due to their involvement in the American Revolution and the extravagant spending of King Louis XVI.
          </div>

          <p className="text">
            Furthermore, the social structure of France divided into three estates.
            <span className="highlight-orange"> were exempt from most taxes </span>.
          </p>

          <p className="text">
            In conclusion, the French Revolution was not caused by a single event.
          </p>
        </section>

        {/* SIDEBAR */}
        <aside className="ver-sidebar">

          <div className="tabs">
            <span 
              className={activeTab === 'ai' ? 'active' : ''}
              onClick={() => setActiveTab('ai')}
            >
              AI Analysis
            </span>

            <span 
              className={activeTab === 'teacher' ? 'active' : ''}
              onClick={() => setActiveTab('teacher')}
            >
              Teacher Comments
            </span>
          </div>

          <div className={`card red ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>Grammar & Syntax</h3>
            <small>2 issues</small>
            <p>"which beginning in 1789" → incorrect verb tense</p>
          </div>

          <div className={`card blue ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>Structure & Flow</h3>
            <small>1 note</small>
            <p>Strong paragraph transition could improve clarity.</p>
          </div>

          <div className={`card yellow ${activeTab !== 'ai' ? 'disabled' : ''}`}>
            <h3>Citations & Facts</h3>
            <small>1 missing</small>
            <p>Add a reference for tax exemption claim.</p>
          </div>

        </aside>
      </main>
    </div>
  );
};

export default VerRedação;