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
          <a>Para estudantes?</a>
          <a>Para professores</a>
          <a>Preços</a>
          <a>Sobre nós</a>
        </nav>

        <div className="navButtons">
          <Link to="/cadastro" className="outline">Cadastrar-se</Link>
          <Link to="/login" className="outline">Entrar</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <img
          className="heroImg"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        />

        <div className="heroText">
          <h1>
            Aprimore sua escrita com feedback baseado em IA
          </h1>

          <p>
            Aprimore suas redações com análise automática de estrutura e dicas práticas
            para professores. Uma maneira mais inteligente de aprender e ensinar a escrever.
          </p>

          <div className="heroBtns">
            <Link to="/login" className="primary">
              Comece agora para estudantes
            </Link>

            <Link to="/cadastro" className="secondary">
              Comece agora para Professores
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Principais recursos</h2>
        <p className="sub">
          Descubra como o MentorIA ajuda você a escrever melhor e mais rápido.
        </p>

        <div className="cards">

          <div className="card">
            <div className="icon">📄</div>
            <h3>Análise Automática de Estrutura</h3>
            <p>
              Nossa IA analisa a estrutura da sua redação e fornece feedback instantâneo
              para garantir uma fluidez lógica.
            </p>
          </div>

          <div className="card">
            <div className="icon">✏️</div>
            <h3>Revisão do professor</h3>
            <p>
              Após o envio do texto, professores revisam sua redação para aprimorar a
              avaliação final.
            </p>
          </div>

          <div className="card">
            <div className="icon">⚡</div>
            <h3>Feedback em tempo real</h3>
            <p>
              Receba sugestões em tempo real sobre gramática, vocabulário e tom enquanto escreve.
            </p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <span>10,000+</span>
          <p>ESTUDANTES AJUDADOS</p>
        </div>

        <div className="stat">
          <span>50,000+</span>
          <p>REDAÇÕES CORRIGIDAS</p>
        </div>

        <div className="stat">
          <span>1,000+</span>
          <p>PROFESSORES CADASTRADOS</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Pronto para aprimorar sua escrita?</h2>
        <p>
          Junte-se a milhares de alunos e professores que já estão usando o MentorIA
          para alcançar melhores resultados.
        </p>

        <Link to="/cadastro" className="primary big">
          Comece agora de graça!
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo">MentorIA</div>

        <div className="links">
          <a>Política de privacidade</a>
          <a>Termos de serviços</a>
          <a>Contato</a>
        </div>

        <p className="copy">© 2024 MentorIA. All rights reserved.</p>
      </footer>

    </div>
  );
}