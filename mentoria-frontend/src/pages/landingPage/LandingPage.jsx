import "./landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">MentorIA</div>

        <nav className="menu">
          <a>Como funciona</a>
          <a>Estudantes</a>
          <a>Professores</a>
          <a>Preços</a>
        </nav>

        <div className="navButtons">
          <Link to="/login" className="outline">Entrar</Link>
          <Link to="/cadastro" className="primary">Começar</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">
          <h1>
            Aprimore sua escrita com inteligência artificial
          </h1>

          <p>
            Plataforma moderna para estudantes e professores evoluírem com feedback inteligente.
          </p>

          <div className="heroBtns">
            <Link to="/cadastro" className="primary">Começar grátis</Link>
            <Link to="/login" className="secondary">Entrar</Link>
          </div>
        </div>

        <div className="heroImageWrapper">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            className="heroImg"
          />
        </div>
      </section>

      {/* CORTE */}
      <div className="wave"></div>

      {/* FEATURES */}
      <section className="features">
        <h2>Recursos principais</h2>

        <div className="cards">
          <div className="card">
            <div className="icon">📄</div>
            <h3>Análise automática</h3>
            <p>Correção inteligente da estrutura da redação.</p>
          </div>

          <div className="card">
            <div className="icon">✏️</div>
            <h3>Revisão humana</h3>
            <p>Professores ajudam a melhorar seu texto.</p>
          </div>

          <div className="card">
            <div className="icon">⚡</div>
            <h3>Tempo real</h3>
            <p>Feedback instantâneo enquanto escreve.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <span>10k+</span>
          <p>Estudantes</p>
        </div>

        <div className="stat">
          <span>50k+</span>
          <p>Redações</p>
        </div>

        <div className="stat">
          <span>1k+</span>
          <p>Professores</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Pronto para evoluir sua escrita?</h2>
        <p>Comece gratuitamente agora mesmo.</p>

        <Link to="/cadastro" className="primary big">
          Criar conta
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo">MentorIA</div>
        <p>© 2026 - Todos os direitos reservados</p>
      </footer>

    </div>
  );
}